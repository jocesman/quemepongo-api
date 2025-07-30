//prenda.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { NivelAbrigo, TipoPrenda } from '../enums/tipos.enums';
import { PrendaImage } from '../entities/prendaImage.entity';

@Entity()
export class Prenda {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID único' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Camiseta algodón', description: 'Nombre descriptivo' })
  nombre: string;

  @Column({ type: 'enum', enum: TipoPrenda })
  @ApiProperty({ 
    example: 'superior', 
    enum: TipoPrenda 
  })
  tipo: string;

  @Column({ type: 'enum', enum: NivelAbrigo })
  @ApiProperty({ example: 'medio', enum: NivelAbrigo })
  abrigo: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'azul', required: false })
  color?: string;

  @ManyToOne(() => User, (user) => user.prendas)
  user: User;

  @OneToMany(() => PrendaImage, (image) => image.prenda)
  imagenes: PrendaImage[];
}


