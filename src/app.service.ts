import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Esta es la API de la aplicación de ¿Qué me pongo?';
  }
}
