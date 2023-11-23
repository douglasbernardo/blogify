import { IsEmail, IsString} from "class-validator";

export class ArticleDto{
  @IsString()
  readonly title: string;

  @IsString()
  readonly titleFont: string;

  @IsString()
  readonly article: string;

  @IsString()
  readonly textFont: string;

  @IsString()
  readonly category: string;

  @IsString()
  readonly status: string;

  @IsEmail()
  createdBy: string
}