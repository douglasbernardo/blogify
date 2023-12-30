import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ArticleService } from '../articles/article.service';
import { LikeService } from 'src/likes/like.service';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectModel(User.name)
    private user: Model<User>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => ArticleService))
    private articleService: ArticleService,
    @Inject(forwardRef(() => LikeService))
    private likesService: LikeService,
  ) {}
  async add_user(data) {
    if (!data.fromGoogle) {
      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {
        const missingField = !data.name
          ? 'nome'
          : !data.email
            ? 'email'
            : 'senha';
        throw new UnauthorizedException(
          `O campo ${missingField} deve ser preenchido.`,
        );
      }
      if (data.password !== data.confirmPassword) {
        throw new UnauthorizedException(
          'Verifique se as senhas inseridas são as mesmas.',
        );
      }
    }
    if (await this.verify_existing_email(data.email)) {
      throw new UnauthorizedException('Esse e-mail já existe');
    }
    const user = await new this.user({
      name: data.name,
      email: data.email,
      password: data.fromGoogle
        ? undefined
        : await bcrypt.hash(data.password, 14),
      fromGoogle: !!data.fromGoogle,
      urlImage: data.fromGoogle ? data.googlePicture : '',
    }).save();
    return {
      user,
      access_token: await this.jwtService.signAsync({
        sub: data.email,
        username: data.name,
      }),
    };
  }
  async verify_existing_email(email): Promise<boolean> {
    return !!(await this.user.findOne({ email: email }).exec());
  }

  async find_user(email: string): Promise<User | undefined> {
    try {
      return await this.user.findOne({ email: email }).exec();
    } catch (e) {
      throw new UnauthorizedException('E-mail não encontrado', e);
    }
  }

  async find_id_user_by_email(email: string) {
    try {
      const user = await this.user.findOne({ email: email }).exec();
      return user._id;
    } catch (e) {
      throw new UnauthorizedException('Id não encontrado', e);
    }
  }

  async edit_user(userData) {
    const user_editing = await this.user.findOne({
      email: userData.currentEmail,
    });
    if (user_editing.fromGoogle) {
      throw new UnauthorizedException(
        'Você só pode editar seu usuário na sua conta google',
      );
    }
    if (!user_editing) {
      throw new UnauthorizedException('E-mail não existe');
    }
    if (userData.name !== '') {
      user_editing.name = userData.name;
    }

    if (userData.email !== '') {
      user_editing.email = userData.email;
    }

    if (userData.password !== '') {
      user_editing.password = bcrypt.hashSync(userData.password, 14);
    }

    return await user_editing.save();
  }
  async get_all_users(): Promise<User[]> {
    return await this.user.find({}).exec();
  }

  async delete_account(email: string) {
    const user_id = await this.find_id_user_by_email(email);
    if (!user_id)
      throw new UnauthorizedException(
        'Usuário não autorizado para excluir a conta',
      );
    try {
      await this.articleService.remove_articles(user_id);
      return await this.user.findOneAndDelete({ _id: user_id });
    } catch (e) {
      throw new UnauthorizedException('Falha ao excluir conta do usuário!');
    }
  }

  async my_activities(email: string) {
    const id = await this.find_id_user_by_email(email); // pega o id do usuario com email
    const articlesLiked = await this.likesService.my_likes(id);

    const articlesPromises = articlesLiked.map(async (item) => {
      if (item.user === String(id)) {
        return await this.articleService.get_articles_by_id(item.article);
      }
      return null;
    });
    const articleDetails = await Promise.all(articlesPromises);
    const validArticles = articleDetails.reduce((acc, articles) => {
      if (articles) {
        acc.push(...articles);
      }
      return acc;
    }, []);

    return {
      articlesLiked: validArticles,
    };
  }
}
