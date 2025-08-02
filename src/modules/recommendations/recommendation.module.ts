// recommendation.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prenda } from '../../entities/prenda.entity';
import { RecommendationService } from './recommendation.service';
import { PrendasModule } from '../prendas/prendas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prenda]), PrendasModule],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}