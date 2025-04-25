import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from '../dto/user.dto';
import { resetMyPassDto, resetPassDto } from 'src/dto/resetPasswordDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signData: signInDto) {
    return this.authService.signIn(signData.email, signData.password);
  }
  @Post('/verify-google-token')
  signIn_with_google(@Request() req) {
    return this.authService.verify_google_token(req.body.access_token);
  }

  @Post('/reset-password')
  resetPassword(@Body() resetUserPassDto: resetPassDto){
    return this.authService.reset_user_password(resetUserPassDto.email)
  }

  @Post('/reset-my-pass')
  resetPasswordData(@Body() resetUserPassDto: resetMyPassDto){
    return this.authService.reset_my_pass(resetUserPassDto)
  }
}
