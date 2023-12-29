import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsDto } from 'src/dto/comments.dto';
import { Comments } from 'src/schemas/comments.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments.name) private comments: Model<Comments>) {}

  async createComment(data: CommentsDto) {
    console.log('cheguei aqui');
    console.log(data);
  }
}
