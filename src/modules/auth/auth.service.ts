// src/auth/auth.service.ts
import { 
  Injectable, 
  ConflictException,
  UnauthorizedException 
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dtos/CreateUser.dto';
import { LoginDto } from './dtos/Login.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const emailExist = await this.usersService.findOneBy({ email: createUserDto.email });
    if (emailExist) {
      throw new ConflictException('El email ya existe');
    }

    const phoneExist = await this.usersService.findOneBy({ phone: createUserDto.phone });
    if (phoneExist) {
      throw new ConflictException('El teléfono ya existe');
    }

    const user = await this.usersService.save(createUserDto);
    const { password, ...userWithoutPassword } = user; // Exclude password from response
    return {
      "success": true,
      "message": "Usuario creado correctamente",
      "data": userWithoutPassword
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string, user: Partial<User> }> {
    const users = await this.usersService.findOneBy({ phone: loginDto.phone });
    if (!users) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(loginDto.password, users.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { password, ...user } = users; // Exclude password from response

    // const payload = { phone: user.phone, sub: user.id };
    const payload = { phone: user.phone, id: user.id, name: user.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }
}