// src/user/users.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }
  

  findOneBy(condition: Partial<User>) {
    return this.usersRepo.findOneBy(condition);
  }

  async save(userDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(userDto.password, 10); // 10 es el saltRounds
    const user = this.usersRepo.create({
        ...userDto,
        password: hashedPassword,
    });

    return this.usersRepo.save(user);
  }
}
