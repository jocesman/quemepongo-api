//create-user.dto.ts
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890' })
  @Length(10, 15)
  phone: string;

  @ApiProperty({ example: 'password123' })
  @Length(8, 15)
  password: string;
}
