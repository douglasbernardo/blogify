import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  createComment() {
    console.log('comentei');
  }
}
