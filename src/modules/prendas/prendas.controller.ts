import { Controller, Get, Post, Body, UseGuards, Request, Query, HttpStatus } from '@nestjs/common';
import { PrendasService } from './prendas.service';
import { CreatePrendaDto } from './dtos/CreatePrenda.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prenda } from '../../entities/prenda.entity';

@ApiTags('Prendas')
@ApiBearerAuth()
@Controller('prendas')
export class PrendasController {
  constructor(private readonly prendasService: PrendasService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Agregar prenda al closet' })
  @ApiBody({ type: CreatePrendaDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: Prenda })
  async create(@Body() createPrendaDto: CreatePrendaDto, @Request() req) {
    return this.prendasService.create(createPrendaDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener prendas del usuario' })
  @ApiQuery({ name: 'tipo', required: false, enum: ['superior', 'inferior', 'accesorio', 'calzado'] })
  @ApiQuery({ name: 'abrigo', required: false, enum: ['alto', 'medio', 'bajo'] })
  @ApiResponse({ status: HttpStatus.OK, type: [Prenda] })
  async findAll(@Request() req, @Query('tipo') tipo?: string, @Query('abrigo') abrigo?: string) {
    return this.prendasService.findByUser(req.user.id, { tipo, abrigo });
  }

  @Get('outfit')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generar outfit recomendado' })
  @ApiQuery({ name: 'clima', required: true, enum: ['calor', 'templado', 'frio', 'lluvia'] })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    schema: {
      example: {
        superior: { id: 'uuid', nombre: 'Camisa', tipo: 'superior' },
        inferior: { id: 'uuid', nombre: 'Jeans', tipo: 'inferior' },
        accesorio: { id: 'uuid', nombre: 'Gorra', tipo: 'accesorio' }
      }
    } 
  })
  async generateOutfit(@Request() req, @Query('clima') clima: string) {
    return this.prendasService.generateOutfit(req.user.id, clima);
  }
}