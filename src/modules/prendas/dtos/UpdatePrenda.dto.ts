import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePrendaDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Camisa de lino', description: 'Nombre de la prenda' })
  nombre?: string;

  @IsOptional()
  @IsEnum(['superior', 'inferior', 'accesorio'])
  @ApiPropertyOptional({ enum: ['superior', 'inferior', 'accesorio'], description: 'Tipo de prenda' })
  tipo?: string;

  @IsOptional()
  @IsEnum(['alto', 'medio', 'bajo'])
  @ApiPropertyOptional({ enum: ['alto', 'medio', 'bajo'], description: 'Nivel de abrigo' })
  abrigo?: string;
}
