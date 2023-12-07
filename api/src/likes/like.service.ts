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
      const alreadyLiked = await this.like.findOne({ user: data.user }).exec();
      if (alreadyLiked && alreadyLiked.article === data.article) {
        console.log('Você já curtiu este artigo');
        throw new UnauthorizedException('Você já curtiu esse artigo');
      }
      const newLike = new this.like({ user: data.user, article: data.article });
      await newLike.save();

      const article = await this.articleService.get_article(data.article);
      if (article) {
        article.likes++;
        await article.save();
      }
      console.log('Curtida registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao curtir o artigo:', error);
      throw error; // Lançar o erro para tratar em um nível superior, se necessário
    }
  }
}
