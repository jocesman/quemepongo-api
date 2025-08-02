// outfit.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outfit } from '../../entities/outfit.entity';
import { OutfitService } from './outfit.service';
import { OutfitController } from './outfit.controller';
import { RecommendationModule } from '../recommendations/recommendation.module';
import { PrendasModule } from '../prendas/prendas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Outfit]), RecommendationModule, PrendasModule],
  providers: [OutfitService],
  controllers: [OutfitController],
  exports: [OutfitService],
})
export class OutfitModule {}