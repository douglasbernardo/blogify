import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../schemas/articles.schema';
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { articleEditDto } from 'src/dto/edit_article';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private article: Model<Article>,
    private userService: UserService,
  ) {}

  async add_new_article(data) {
    return new this.article({
      backgroundImage: data.backgroundImage,
      title: data.title,
      titleFont: data.titleFont,
      article: data.article,
      textFont: data.textFont,
      category: data.category,
      status: data.status,
      createdBy: data.createdBy,
    }).save();
  }

  async get_my_articles(email: string) {
    return this.article.find({ createdBy: email }).exec();
  }

  async get_article(id) {
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
  async all_categories() {
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

  async last_added() {
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
}
