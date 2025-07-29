//prendaImage.controller.ts
import { Controller, Post, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrendaImagesService } from './prendaImage.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('prendas/:id/images')
export class PrendaImagesController {
  constructor(private readonly imagesService: PrendaImagesService) {}

 @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir imagen para una prenda' })
  @ApiParam({ name: 'id', description: 'ID de la prenda', type: String })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo de imagen para la prenda',
    schema: { 
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen (JPEG, PNG)'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Imagen subida exitosamente',
    schema: {
      example: {
        id: '5f8d8f9e0-4b1c-4f2d-8b3a-5c6d7e8f9a0b',
        url: 'https://res.cloudinary.com/tu-cloud/image/upload/v123456789/prenda.jpg',
        prendaId: 'a7d8f9e0-4b1c-4f2d-8b3a-5c6d7e8f9a0b'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Formato de archivo no válido'
  })
  @ApiResponse({
    status: 404,
    description: 'Prenda no encontrada'
  })
  async uploadImage(
    @Param('id') prendaId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imagesService.uploadImage(prendaId, file);
  }
}