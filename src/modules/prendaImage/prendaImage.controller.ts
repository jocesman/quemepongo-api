import { Controller, Post, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrendaImagesService } from './prendaImage.service';

@Controller('prendas/:id/images')
export class PrendaImagesController {
  constructor(private readonly imagesService: PrendaImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') prendaId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imagesService.uploadImage(prendaId, file);
  }
}