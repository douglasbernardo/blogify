import { Body, Controller, Post, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsDto } from 'src/dto/comments.dto';

@Controller('comment')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  creatingComment(@Body() commentData: CommentsDto) {
    return this.commentsService.createComment(commentData);
  }

  @Post('all')
  get_comments(@Request() req) {
    return this.commentsService.get_all_comments(req.body.id);
  }
}
