import { Controller, Post, Request } from '@nestjs/common';
import { uploadService } from './upload.service';

@Controller('upload')
export class uploadController {
  constructor(private upload: uploadService) {}

  @Post('upload-picture')
  uploadPicture(@Request() req) {
    return this.upload.uploadProfilePicture(req.body);
  }
}
