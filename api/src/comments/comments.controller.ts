import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsDto } from 'src/dto/comments.dto';

@Controller('comment')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  creatingComment(@Body() commentData: CommentsDto) {
    return this.commentsService.createComment(commentData);
  }
}
