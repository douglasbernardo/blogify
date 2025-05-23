import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import 'config.env';
import * as process from 'process';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './articles/article.module';
import { uploadModule } from './upload/upload.module';
import { LikeModule } from './likes/like.module';
import { CommentsModule } from './comments/comments.module';
import { AppController } from './app.controller';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.ENVIRONMENT == 'DEVELOPMENT' ?
      process.env.DATABASE_URL_DEV :
      process.env.DATABASE_URL 
    ),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    AuthModule,
    ArticleModule,
    uploadModule,
    LikeModule,
    CommentsModule,
    MailModule
  ],
  controllers: [AppController],
})
export class AppModule {}