// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';
import { PrendasModule } from './modules/prendas/prendas.module';
import { JwtModule } from '@nestjs/jwt';
import { PrendaImagesModule } from './modules/prendaImage/prendaImage.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { OutfitModule } from './modules/outfit/outfit.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST', 'localhost'),
          port: config.get<number>('DB_PORT', 3306),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, 
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    PrendasModule, 
    CloudinaryModule,
    PrendaImagesModule,
    OutfitModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})

export class AppModule {}
