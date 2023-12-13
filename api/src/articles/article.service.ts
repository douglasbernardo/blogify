import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../schemas/articles.schema';
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { articleEditDto } from 'src/dto/edit_article';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private article: Model<Article>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async add_new_article(data) {
    const user_id = await this.userService.find_id_user_by_email(data.createdBy);
    return new this.article({
      backgroundImage: data.backgroundImage,
      title: data.title,
      titleFont: data.titleFont,
      article: data.article,
      textFont: data.textFont,
      category: data.category,
      status: data.status,
      createdBy: user_id,
    }).save();
  }

  get_all_articles() {
    return this.article.find({ status: 'publicado' }).exec();
  }

  async get_my_articles(email: string) {
    const user_id = await this.userService.find_id_user_by_email(email);
    return await this.article.find({ createdBy: user_id }).exec();
  }

  get_article(id: string) {
    return this.article.findOne({ _id: id });
  }

  async edit_article(article: articleEditDto) {
    const edit_article = await this.article.findById(article.id);
    const updated_fields = {
      backgroundImage: article.backgroundImage || edit_article.backgroundImage,
      title: article.title || edit_article.title,
      titleFont: article.titleFont || edit_article.titleFont,
      article: article.article || edit_article.article,
      textFont: article.textFont || edit_article.textFont,
      category: article.category || edit_article.category,
      status: article.status || edit_article.status,
    };
    Object.assign(edit_article, updated_fields);
    return await edit_article.save();
  }
  all_categories() {
    return this.article.distinct('category').exec();
  }

  async remove_article(data) {
    const user = await this.userService.verify_existing_email(data.email);
    return user
      ? this.article.findOneAndDelete({ _id: data.id })
      : (() => {
          throw new UnauthorizedException('Falha ao deletar artigo');
        })();
  }

  async remove_articles(user_id: string) {
    return this.article.deleteMany({
      createdBy: user_id,
    });
  }

  last_added() {
    return this.article
      .find({ status: 'publicado' })
      .sort({ _id: -1 })
      .limit(3);
  }

  async add_views(id: string) {
    if (id) {
      try {
        const article = await this.article.findOne({ _id: id }).exec();
        if (article) {
          article.views += 1;
          await article.save();
        } else {
          console.log('Article not found');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async increment_article_like(article_id: string) {
    try {
      const article_liked = await this.article.findOneAndUpdate(
        { _id: article_id },
        { $inc: { likes: 1 } },
        { new: true },
      );
      if (!article_liked) {
        throw new Error('Artigo não encontrado');
      }
      return article_liked;
    } catch (e) {
      console.log('Error ao tentar dar like no artigo', e);
      throw Error;
    }
  }
}
