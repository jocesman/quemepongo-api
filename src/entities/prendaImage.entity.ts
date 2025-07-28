import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Prenda } from '../entities/prenda.entity';

@Entity()
export class PrendaImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  publicId: string; // ID de Cloudinary para manejo avanzado

  @ManyToOne(() => Prenda, (prenda) => prenda.imagenes)
  prenda: Prenda;
}