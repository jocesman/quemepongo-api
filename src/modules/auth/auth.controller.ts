import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiConsumes,
  ApiProduces 
} from '@nestjs/swagger';

@ApiTags('Auth') // Debe coincidir con el tag en DocumentBuilder
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica al usuario y devuelve un token JWT' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login exitoso. Devuelve un token JWT' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciales inválidas' 
  })
  @ApiBody({ 
    type: LoginDto,
    description: 'Credenciales de acceso',
    // examples: {
    //   admin: {
    //     value: {
    //       email: "admin@example.com",
    //       password: "password123"
    //     }
    //   },
    //   user: {
    //     value: {
    //       email: "user@example.com",
    //       password: "password456"
    //     }
    //   }
 //   }
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}