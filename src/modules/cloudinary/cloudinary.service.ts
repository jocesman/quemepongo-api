//cloudinary.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {

    // Validación de tipo de archivo
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Solo se permiten archivos de imagen');
    }

    // Validación de tamaño máximo (5MB)
    const maxSizeInBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      throw new BadRequestException('La imagen excede el tamaño máximo de 2MB');
    }

    return new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: 'auto' as const,
        folder: 'que-me-pongo',
      };

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(new Error(`Upload failed: ${error.message}`));
          }
          if (!result) {
            return reject(new Error('Upload failed: No result received'));
          }
          resolve(result.secure_url);
        }
      );

      uploadStream.end(file.buffer);
    });
  }
}