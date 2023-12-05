import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({timestamps: true})
export class Article extends Document {
  @Prop()
  backgroundImage: string

  @Prop()
  title: string

  @Prop()
  titleFont: string

  @Prop()
  article: string

  @Prop()
  textFont: string

  @Prop()
  category: string

  @Prop({default: 0})
  likes: Number


  @Prop({default: []})
  comments: Array<Object>


  @Prop({default: 0})
  views: Number

  @Prop()
  status: string

  @Prop()
  createdBy: string
}

export const articleSchema = SchemaFactory.createForClass(Article)