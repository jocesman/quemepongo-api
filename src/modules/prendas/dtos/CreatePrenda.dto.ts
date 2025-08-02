//dtos/CreatePrenda.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NivelAbrigo, TipoPrenda } from '../../../enums/tipos.enums';

export class CreatePrendaDto {
  @ApiProperty({
    example: 'Camiseta algodón',
    description: 'Nombre descriptivo de la prenda'
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'superior',
    enum: TipoPrenda,
    description: 'Tipo de prenda (superior, inferior, accesorio, calzado)'
  })
  @IsNotEmpty()
  @IsEnum(TipoPrenda)
  tipo: string;

  @ApiProperty({
    example: 'medio',
    enum: NivelAbrigo,
    description: 'Abrigo de la prenda (alto, medio, bajo)'
  })
  @IsNotEmpty()
  @IsEnum(NivelAbrigo)
  abrigo: string;

  @ApiProperty({
    example: 'azul',
    required: false
  })
  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'frio', required: false })
  clima?: string;

}