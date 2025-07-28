// src/user/user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './user.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';

interface CreateUserResponse {
  message: string;
  success: boolean;
  data?: Partial<User>;
}

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o usuario duplicado' })
  async createUser(@Body() user: CreateUserDto): Promise<CreateUserResponse> {
    const emailExist = await this.usersService.findOneBy({ email: user.email });
    if (emailExist) {
      return {
        message: 'El email ya existe',
        success: false,
      };
    }

    const phoneExist = await this.usersService.findOneBy({ phone: user.phone });
    if (phoneExist) {
      return {
        message: 'El teléfono ya existe',
        success: false,
      };
    }

    const created = await this.usersService.save(user);

    // Devuelve solo campos seguros (sin contraseña)
    const { password, ...safeData } = created;

    return {
      message: 'Usuario creado correctamente',
      success: true,
      data: safeData,
    };
  }
}
