import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('add')
  addArticle(@Request() req) {
    return this.articleService.add_new_article(req.body);
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
    return this.articleService.lastAdded();
  }

  @Post('add-view')
  async views(@Request() req) {
    return this.articleService.addViews(req.body.id);
  }
}
