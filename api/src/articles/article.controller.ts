import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { articleEditDto } from 'src/dto/edit_article';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('add')
  addArticle(@Request() req) {
    return this.articleService.add_new_article(req.body);
  }

  @Post('/edit')
  editArticle(@Body() dataEditDto: articleEditDto) {
    return this.articleService.edit_article(dataEditDto);
  }

  @Get('/categories')
  getCategories() {
    return this.articleService.all_categories();
  }

  @Get('/reading/:id')
  getArticle(@Param() params: any) {
    return this.articleService.get_article(params.id);
  }

  @Post('/my_articles')
  getMyArticles(@Request() req) {
    return this.articleService.get_my_articles(req.body.email);
  }

  @Post('remove')
  deleteArticle(@Request() req) {
    return this.articleService.remove_article(req.body);
  }

  @Get('last-added')
  threeLastAdded() {
    return this.articleService.last_added();
  }

  @Post('add-view')
  async views(@Request() req) {
    return this.articleService.add_views(req.body.id);
  }
}
