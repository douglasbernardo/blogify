import {Body, Controller, Delete, Get, Param, Post, Request, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ArticleService} from "./article.service";
import {ArticleDto} from "../dto/article.dto";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('backgroundImage'))
  addArticle(@UploadedFile() image){
    return this.articleService.add_new_article(image)
  }

  @Get('/categories')
  getCategories(){
    return this.articleService.all_categories()
  }

  @Get('/reading/:id')
  getArticle(@Param() params: any){
    return this.articleService.get_article(params.id)
  }

  @Post('/my_articles')
  getMyArticles(@Request() req){
    return this.articleService.get_my_articles(req.body.email)
  }

  @Post('remove')
  deleteArticle(@Request() req){
    return this.articleService.remove_article(req.body)
  }
}