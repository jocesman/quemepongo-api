import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outfit } from '../../entities/outfit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OutfitService {
  constructor(
    @InjectRepository(Outfit)
    private readonly outfitRepo: Repository<Outfit>,
  ) {}

  async saveOutfit(data: Partial<Outfit>): Promise<Outfit> {
    return this.outfitRepo.save(data);
  }

  async findHistorialByUser(userId: string): Promise<Outfit[]> {
    return this.outfitRepo.find({
      where: { user: { id: userId } },
      relations: ['superior', 'inferior', 'accesorio','calzado'],
      order: { fecha: 'DESC' }
    });
  }
}
