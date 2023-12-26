import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import 'config.env';
import * as process from 'process';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './articles/article.module';
import { uploadModule } from './upload/upload.module';
import { LikeModule } from './likes/like.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATA_BASE),
    UserModule,
    AuthModule,
    ArticleModule,
    uploadModule,
    LikeModule,
  ],
})
export class AppModule {}
