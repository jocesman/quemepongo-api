import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outfit } from '../../entities/outfit.entity';
import { OutfitService } from './outfit.service';
import { OutfitController } from './outfit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Outfit])],
  providers: [OutfitService],
  controllers: [OutfitController],
  exports: [OutfitService],
})
export class OutfitModule {}
