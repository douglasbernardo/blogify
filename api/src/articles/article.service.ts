import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../schemas/articles.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

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

  async get_my_articles(email) {
    return this.article.find({ createdBy: email }).exec();
  }

  async get_article(id) {
    return this.article.findOne({ _id: id });
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

  async lastAdded() {
    return this.article
      .find({ status: 'publicado' })
      .sort({ _id: -1 })
      .limit(3);
  }
}
