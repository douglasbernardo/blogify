import { Controller, Post, Request } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('i-liked')
  likeArticle(@Request() req) {
    return this.likeService.iLiked(req.body);
  }
}
