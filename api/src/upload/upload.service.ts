import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

interface UploadProfileImgBB {
  email: string,
  urlImage: string
}
@Injectable()
export class uploadService {
  constructor(private userManager: UserService) {}

  async uploadProfilePicture(data: UploadProfileImgBB): Promise<any> {
    const user = await this.userManager.find_user(data.email);
    if (!user && !data.urlImage) {
      throw new UnauthorizedException('A tentativa de upload falhou!');
    }
    user.urlImage = data.urlImage;
    return user.save();
  }
}
