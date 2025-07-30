//login.dto.ts
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: '987654321',
    description: 'Número de teléfono (solo dígitos, 9-15 caracteres)',
    required: true,
    type: String,
  })
  @Matches(/^[0-9]{9,15}$/, {
    message: 'El número debe contener solo dígitos (9-15 caracteres)',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'mipassword123',
    description: 'Contraseña (8-20 caracteres)',
    required: true,
    type: String,
  })
  @Length(8, 20)
  @IsNotEmpty()
  password: string;
}