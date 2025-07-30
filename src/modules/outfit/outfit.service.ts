//outfit.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outfit } from '../../entities/outfit.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Prenda } from '../../entities/prenda.entity';

@Injectable()
export class OutfitService {
  constructor(
    @InjectRepository(Outfit)
    private readonly outfitRepo: Repository<Outfit>,
  ) {}

  // async saveOutfit(data: Partial<Outfit>): Promise<Outfit> {
  //   return this.outfitRepo.save(data);
  // }

  // async saveOutfit(data: {
  //     user: { id: string };
  //     superior: { id: string };
  //     inferior: { id: string };
  //     accesorio?: { id: string } | null;
  //     clima: string;
  //   }): Promise<Outfit> {
  //     const outfit = this.outfitRepo.create({
  //       user: { id: data.user.id } as any, // forzar como relación mínima
  //       superior: { id: data.superior.id } as any,
  //       inferior: { id: data.inferior.id } as any,
  //       clima: data.clima,
  //       ...(data.accesorio ? { accesorio: { id: data.accesorio.id } as any } : {}),
  //     });

  //     return this.outfitRepo.save(outfit);
  // }

  async saveOutfit(data: Partial<Outfit>): Promise<Outfit> {
      const newOutfit = this.outfitRepo.create({
        user: { id: data.user?.id } as any,
        superior: { id: data.superior?.id } as any,
        inferior: { id: data.inferior?.id } as any,
        accesorio: data.accesorio?.id ? { id: data.accesorio?.id } as any : undefined,
        clima: data.clima,
      });

      // Usamos insert para evitar conflictos con save()
      const insertResult = await this.outfitRepo.insert(newOutfit);

      // Recuperamos el outfit recién insertado
      const inserted = await this.outfitRepo.findOne({
      where: { id: insertResult.identifiers[0].id },
      relations: [
        'superior',
        'superior.imagenes',
        'inferior',
        'inferior.imagenes',
        'accesorio',
        'accesorio.imagenes',
      ],
    });

    if (!inserted) {
      throw new Error('No se pudo recuperar el outfit insertado.');
    }

    return inserted;
  }



  async findHistorialByUser(userId: string): Promise<Outfit[]> {
  const outfits = await this.outfitRepo.find({
    where: { user: { id: userId } },
    relations: [
      'superior',
      'superior.imagenes',
      'inferior',
      'inferior.imagenes',
      'accesorio',
      'accesorio.imagenes',
    ],
    order: { fecha: 'DESC' },
  });

  return outfits;
}

}
