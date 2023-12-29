import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class Comments extends Document {
  @Prop()
  author: string;

  @Prop()
  emailAuthor: string;

  @Prop()
  idArticle: ObjectId;

  @Prop()
  text: string;
}

export const commentsSchema = SchemaFactory.createForClass(Comments);
