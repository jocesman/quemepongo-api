//prendas.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prenda } from '../../entities/prenda.entity';
import { CreatePrendaDto } from './dtos/CreatePrenda.dto';
import { User } from '../../entities/user.entity';
import { UpdatePrendaDto } from './dtos/UpdatePrenda.dto';

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

  async delete(id: string, userId: string) {
    const prenda = await this.prendasRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['imagenes'],
    });

    if (!prenda) throw new NotFoundException('Prenda no encontrada');

    try {
      await this.prendasRepo.remove(prenda);
      return { message: 'Prenda eliminada con éxito' };
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new BadRequestException('No se puede eliminar: la prenda está en uso en un outfit');
      }
      throw error;
    }
  }
  
  async update(id: string, userId: string, dto: UpdatePrendaDto) {
    const prenda = await this.prendasRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!prenda) {
      throw new NotFoundException('Prenda no encontrada');
    }

    Object.assign(prenda, dto);
    return this.prendasRepo.save(prenda);
  }

}