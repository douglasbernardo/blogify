import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class uploadService {
  constructor(private userManager: UserService) {}
  async uploadProfilePicture(data) {
    const user = await this.userManager.find_user(data.email);
    if (!user) {
      throw new UnauthorizedException('Failed to upload your profile picture');
    }
    user.urlImage = data.urlImage;
    return user.save();
  }
}
