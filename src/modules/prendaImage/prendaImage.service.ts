//prendaImage.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrendaImage } from '../../entities/prendaImage.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PrendaImagesService {
  constructor(
    @InjectRepository(PrendaImage)
    private readonly imageRepo: Repository<PrendaImage>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async uploadImage(
    prendaId: string,
    file: Express.Multer.File,
  ): Promise<PrendaImage> {
    const url = await this.cloudinary.uploadImage(file);
    return this.imageRepo.save({ url, prenda: { id: prendaId } });
  }
}