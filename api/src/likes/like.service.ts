import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleService } from 'src/articles/article.service';
import { Like } from 'src/schemas/like.schema';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private like: Model<Like>,
    private articleService: ArticleService,
  ) {}

  async iLiked(data) {
    try {
      const existingLike = await this.like.findOne({
        user: data.user,
        article: data.article,
      });
      if (existingLike) {
        throw new UnauthorizedException('Artigo já foi curtido por você');
      } else {
        const newLike = new this.like({
          user: data.user,
          article: data.article,
        });
        await newLike.save();

        return await this.articleService.increment_article_like(data.article); //passing as parameter the article id
      }
    } catch (error) {
      console.error('Erro ao curtir o artigo:', error);
      throw error;
    }
  }
}
