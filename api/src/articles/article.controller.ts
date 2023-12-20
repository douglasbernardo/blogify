import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { articleEditDto } from '../dto/edit_article';
import { Article } from 'src/schemas/articles.schema';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('add')
  addArticle(@Request() req) {
    return this.articleService.add_new_article(req.body);
  }

  @Get('all')
  getArticles(): Promise<Article[]> {
    return this.articleService.get_all_articles();
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
  getArticle(@Param('id') id: string) {
    return this.articleService.get_article(id);
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
