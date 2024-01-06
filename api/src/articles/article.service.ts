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
import { articleEditDto } from '../dto/edit_article';
import {
  AddArticleInterface,
  DeleteArticleInterface,
} from '../interfaces/article.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private article: Model<Article>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async add_new_article(data: AddArticleInterface): Promise<Article> {
    return new this.article({
      backgroundImage: data.backgroundImage,
      title: data.title,
      titleFont: data.titleFont,
      article: data.article,
      textFont: data.textFont,
      category: data.category,
      status: data.status,
      createdBy: await this.userService.find_id_user_by_email(data.createdBy),
    }).save();
  }

  async get_all_articles(): Promise<Article[]> {
    return await this.article.find().exec();
  }

  async get_articles_by_id(id: string): Promise<Article[]> {
    return await this.article.find({ _id: id }).exec();
  }

  async get_my_articles(email: string) {
    const user = await this.userService.find_id_user_by_email(email);
    if (!user) return [];
    return await this.article.find({ createdBy: user }).exec();
  }

  async get_article(id: string): Promise<Article> {
    const articleDoc = await this.article.findOne({ _id: id }).exec();
    return articleDoc ? (articleDoc.toObject() as Article) : null;
  }

  async edit_article(article: articleEditDto): Promise<Article> {
    console.log(article);
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
  async remove_article(data: DeleteArticleInterface) {
    const [emailExists, deletedArticle] = await Promise.all([
      this.userService.verify_existing_email(data.email),
      this.article.findOneAndDelete({ _id: data.id }),
    ]);
    if (!emailExists && !deletedArticle) {
      throw new UnauthorizedException('Aconteceu uma falha ao deletar artigo!');
    }
    return deletedArticle;
  }

  async filter_articles(categories) {
    const articles = await this.article.find({}).exec();
    const categoriesArray = categories._value;

    return articles.filter((article) =>
      categoriesArray.includes(article.category),
    );
  }

  async remove_articles(user_id: string): Promise<any> {
    try {
      const result = await this.article.deleteMany({ createdBy: user_id });
      console.log(
        `${result.deletedCount} articles deleted for user ${user_id}`,
      );
      return result; // ou você pode retornar um feedback personalizado se necessário
    } catch (error) {
      console.error(`Error deleting articles:`, error);
      throw error;
    }
  }

  async last_added(): Promise<Article[]> {
    return await this.article
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
