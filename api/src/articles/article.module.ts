import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Article, articleSchema} from "../schemas/articles.schema";
import {ArticleService} from "./article.service";
import {ArticleController} from "./article.controller";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";


@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: articleSchema
      }
    ]),
    UserModule
  ],
  controllers: [ArticleController],
  exports: [ArticleService],
  providers: [ArticleService],
})

export class ArticleModule{}