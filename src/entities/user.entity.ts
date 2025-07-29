//user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Prenda } from './prenda.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Outfit } from './outfit.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID único' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'juan@mail.com', description: 'Email válido' })
  email: string;

  @Column({ unique: true })
  @ApiProperty({ example: '+51987654321', description: 'Teléfono con código de país' })
  phone: string;

  @Column()
  password: string;

  @OneToMany(() => Prenda, (prenda) => prenda.user)
  @ApiProperty({ type: () => [Prenda], description: 'Prendas del usuario' })
  prendas: Prenda[];

  @OneToMany(() => Outfit, (outfit) => outfit.user)
  outfits: Outfit[];


}