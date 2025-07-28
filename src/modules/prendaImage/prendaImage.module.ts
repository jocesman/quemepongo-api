import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrendaImage } from '../../entities/prendaImage.entity';
import { PrendaImagesService } from './prendaImage.service';
import { PrendaImagesController } from './prendaImage.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrendasModule } from '../prendas/prendas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrendaImage]), // Registra la entidad
    CloudinaryModule, // Para el servicio de upload
    PrendasModule, // Para validar la relación con Prendas
  ],
  controllers: [PrendaImagesController],
  providers: [PrendaImagesService],
  exports: [PrendaImagesService], // Opcional: si otros módulos lo necesitan
})
export class PrendaImagesModule {}