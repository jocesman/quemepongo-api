import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Correo electrónico del usuario',
    required: true,
    type: String,
    format: 'email'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'mipassword123',
    description: 'Contraseña del usuario (8-20 caracteres)',
    required: true,
    type: String,
    minLength: 8,
    maxLength: 20
  })
  @Length(8, 20)
  @IsNotEmpty()
  password: string;
}