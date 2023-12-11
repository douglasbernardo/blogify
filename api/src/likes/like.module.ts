import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, likeSchema } from 'src/schemas/like.schema';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { ArticleModule } from 'src/articles/article.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Like.name,
        schema: likeSchema,
      },
    ]),
    ArticleModule,
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class likeModule {}
