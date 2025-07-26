import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middleware/logger.middleware';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
  .setTitle('API de App ¿Qué me pongo?') // Título de la documentación
  // Descripción 
  .addBearerAuth()
  .setDescription('Documentación técnica de la API REST que respalda las operaciones de la App ¿Qué me Pongo?') 
  .setVersion('1.0.0') // Versión 
  .build();

  // Generación del documento Swagger 
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Montaje de la interfaz de Swagger en la ruta '/api'
  SwaggerModule.setup('api', app, document);

  app.use(LoggerGlobal);
  app.use(express.json());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap(); 
