import { Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comment')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  creatingComment() {
    return this.commentsService.createComment();
  }
}
