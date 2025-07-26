import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  email: string;

  @Column({ length: 15, nullable: false })
  phone: string;

  @Column({ length: 15 }) 
  password: string;
}
