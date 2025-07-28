import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dtos/Login.dto';
import { AuthService } from './auth.service';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiConsumes,
  ApiProduces 
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dtos/CreateUser.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ 
    type: CreateUserDto,
    examples: {
      example1: {
        value: {
          name: "Juan Pérez",
          email: "juan@example.com",
          phone: "+51987654321",
          password: "P@ssw0rd123"
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Usuario registrado exitosamente',
    schema: {
      example: {
        id: "uuid",
        name: "Juan Pérez",
        email: "juan@example.com",
        phone: "+51987654321"
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'El email o teléfono ya existen',
    schema: {
      example: {
        statusCode: 409,
        message: "El email ya está registrado",
        error: "Conflict"
      }
    }
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica al usuario y devuelve un token JWT' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Login exitoso. Devuelve un token JWT',
    schema: {
      example: {
        access_token: "jwt.token.here",
        user: {
          id: "uuid",
          email: "juan@example.com"
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Credenciales inválidas',
    schema: {
      example: {
        statusCode: 401,
        message: "Credenciales inválidas",
        error: "Unauthorized"
      }
    }
  })
  @ApiBody({ 
    type: LoginDto,
    description: 'Credenciales de acceso',
    examples: {
      example1: {
        value: {
          email: "juan@example.com",
          password: "P@ssw0rd123"
        }
      },
      example2: {
        value: {
          phone: "51987654321",
          password: "P@ssw0rd123"
        }
      }
    }
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}