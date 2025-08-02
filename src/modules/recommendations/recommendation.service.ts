// recommendation.service.ts
import { Injectable } from '@nestjs/common';
import { PrendasService } from '../prendas/prendas.service';

@Injectable()
export class RecommendationService {
  constructor(private readonly prendasService: PrendasService) {}

  async generateOutfit(userId: string, clima: string) {
    const prendas = await this.prendasService.findByUser(userId);
    
    const rules = {
      calor: { abrigo: 'bajo' },
      frio: { abrigo: 'alto' },
      templado: { abrigo: 'medio' },
      lluvia: { tipo: 'accesorio', nombre: 'Paraguas' },
    };

    const filtro = rules[clima] || {};
    
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