import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Comments extends Document {
  @Prop()
  author: string;

  @Prop()
  email: string;

  @Prop()
  text: string;
}

export const commentsSchema = SchemaFactory.createForClass(Comments);
