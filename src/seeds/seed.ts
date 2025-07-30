//seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../modules/user/user.service';
import { PrendasService } from '../modules/prendas/prendas.service';
import { OutfitService } from '../modules/outfit/outfit.service';
import { CreateUserDto } from '../modules/user/dtos/CreateUser.dto';
import { CreatePrendaDto } from '../modules/prendas/dtos/CreatePrenda.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const prendasService = app.get(PrendasService);
  const outfitService = app.get(OutfitService);

  // 1. Crear usuario demo
  const userDto: CreateUserDto = {
    name: 'Usuario Demo',
    email: 'demo@example.com',
    phone: '1234567890',
    password: 'password123',
  };

  const user = await usersService.save(userDto);

  // 2. Crear prendas
  const prendasMap: Record<string, any> = {};

  const prendas: CreatePrendaDto[] = [
    {
      nombre: 'Camiseta de algodón',
      tipo: 'superior',
      abrigo: 'bajo',
      color: 'blanco',
    },
    {
      nombre: 'Jeans azules',
      tipo: 'inferior',
      abrigo: 'medio',
      color: 'azul',
    },
    {
      nombre: 'Zapatillas blancas',
      tipo: 'calzado',
      abrigo: 'bajo',
      color: 'blanco',
    },
    {
      nombre: 'Bufanda gris',
      tipo: 'accesorio',
      abrigo: 'alto',
      color: 'gris',
    },
  ];

  for (const prendaDto of prendas) {
    const prenda = await prendasService.create(prendaDto, user);
    prendasMap[prendaDto.tipo] = prenda;
  }

  // 3. Crear outfit
  const outfit = await outfitService.saveOutfit({
    user,
    superior: prendasMap['superior'],
    inferior: prendasMap['inferior'],
    accesorio: prendasMap['accesorio'], // opcional
    clima: 'frio',
  });

  console.log('🌱 Precarga completada con éxito.');
  console.log('👤 Usuario:', user.email);
  console.log('🧥 Outfit generado:', outfit);

  await app.close();
}

bootstrap();
