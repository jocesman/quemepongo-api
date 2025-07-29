//prendas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prenda } from '../../entities/prenda.entity';
import { CreatePrendaDto } from './dtos/CreatePrenda.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class PrendasService {
  constructor(
    @InjectRepository(Prenda)
    private readonly prendasRepo: Repository<Prenda>,
  ) {}

  async create(createPrendaDto: CreatePrendaDto, user: User): Promise<Prenda> {
    const prenda = this.prendasRepo.create({
      ...createPrendaDto,
      user,
    });
    return await this.prendasRepo.save(prenda);
  }

  async findByUser(userId: string, filters?: { tipo?: string; abrigo?: string }): Promise<Prenda[]> {
    const query: any = { where: { user: { id: userId } } };

    if (filters?.tipo) query.where.tipo = filters.tipo;
    if (filters?.abrigo) query.where.abrigo = filters.abrigo;

    return this.prendasRepo.find(query);
  }

  async generateOutfit(userId: string, clima: string): Promise<any> {
    const prendas = await this.findByUser(userId);
    
    const rules = {
      calor: { abrigo: 'bajo' },
      frio: { abrigo: 'alto' },
      lluvia: { tipo: 'accesorio', nombre: 'Paraguas' },
    };

    const filtro = rules[clima] || {};
    
    return {
      superior: prendas.find(p => p.tipo === 'superior' && (!filtro.abrigo || p.abrigo === filtro.abrigo)),
      inferior: prendas.find(p => p.tipo === 'inferior'),
      accesorio: prendas.find(p => p.tipo === 'accesorio' && (!filtro.nombre || p.nombre.includes(filtro.nombre))),
    };
  }
}