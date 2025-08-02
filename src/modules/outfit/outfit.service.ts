//outfit.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outfit } from '../../entities/outfit.entity';
import { Repository } from 'typeorm';
import { PrendasService } from '../prendas/prendas.service';

@Injectable()
export class OutfitService {
  constructor(
    @InjectRepository(Outfit)
    private readonly outfitRepo: Repository<Outfit>,
    private readonly prendasService: PrendasService
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

async generateOutfit(userId: string, clima: string): Promise<any> {
  const prendas = await this.prendasService.findByUser(userId);
  
  const rules = {
    calor: { abrigo: 'bajo' },
    frio: { abrigo: 'alto' },
    templado: { abrigo: 'medio' },
    lluvia: { tipo: 'accesorio', nombre: 'Paraguas' },
  };

  const filtro = rules[clima] || {};
  
  // Mejor algoritmo de selección
  const superior = prendas
    .filter(p => p.tipo === 'superior' && (!filtro.abrigo || p.abrigo === filtro.abrigo))
    .sort(() => 0.5 - Math.random())[0];

  const inferior = prendas
    .filter(p => p.tipo === 'inferior')
    .sort(() => 0.5 - Math.random())[0];

  const accesorio = prendas
    .filter(p => p.tipo === 'accesorio' && (!filtro.nombre || p.nombre.includes(filtro.nombre)))
    .sort(() => 0.5 - Math.random())[0];

  return {
    superior,
    inferior,
    accesorio: accesorio || null,
  };
}

}
