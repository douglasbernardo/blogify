import {Body, Controller, Delete, Get, Param, Post, Request} from "@nestjs/common";
import {ArticleService} from "./article.service";
import {ArticleDto} from "../dto/article.dto";
import {UserDto} from "../dto/user.dto";


@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('add')
  addArticle(@Body() articleDto: ArticleDto){
    return this.articleService.add_new_article(articleDto)
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