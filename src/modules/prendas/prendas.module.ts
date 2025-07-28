import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prenda } from '../../entities/prenda.entity';
import { PrendasService } from './prendas.service';
import { PrendasController } from './prendas.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prenda]), UserModule],
  controllers: [PrendasController],
  providers: [PrendasService],
  exports: [PrendasService],
})
export class PrendasModule {}