import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fromGoogle: boolean;

  @Prop({ default: '' })
  urlImage: string;
}

export const userSchema = SchemaFactory.createForClass(User);
