import { IsString } from 'class-validator';

export class resetPassDto {
  @IsString()
  readonly email: string;
}

export class resetMyPassDto {
  @IsString()
  readonly token: string;
  @IsString()
  readonly pass: string;
}
