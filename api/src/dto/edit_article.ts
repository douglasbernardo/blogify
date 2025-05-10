import { IsString } from 'class-validator';

export class articleEditDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly backgroundImage: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly article: string;
  @IsString()
  readonly category: string;
  @IsString()
  readonly status: string;
}
