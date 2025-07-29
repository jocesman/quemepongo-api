//outfit.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Prenda } from './prenda.entity';

@Entity()
export class Outfit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.outfits)
  user: User;

  @ManyToOne(() => Prenda)
  superior: Prenda;

  @ManyToOne(() => Prenda)
  inferior: Prenda;

  @ManyToOne(() => Prenda, { nullable: true })
  accesorio?: Prenda;

  @Column()
  clima: string;

  @CreateDateColumn()
  fecha: Date;
}
