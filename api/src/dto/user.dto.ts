import {IsEmail, IsOptional, IsString} from "class-validator";
import {OmitType} from "@nestjs/swagger";;

export class UserDto{
  @IsString()
  readonly name: string;
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string
}

export class signInDto extends OmitType(UserDto, ['name'] as const) {
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string
}