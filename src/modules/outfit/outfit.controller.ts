//outfit.controller.ts
import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { OutfitService } from './outfit.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Outfit } from '../../entities/outfit.entity';


@ApiTags('Outfit')
@ApiBearerAuth()
@Controller('outfit')
export class OutfitController {
  constructor(private readonly outfitService: OutfitService) {}

  @Get('historial')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Historial de outfits generados' })
  @ApiResponse({ status: 200, type: [Outfit] })
  async historial(@Request() req) {
    return this.outfitService.findHistorialByUser(req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Guardar outfit generado' })
  @ApiResponse({ status: 201, description: 'Outfit guardado correctamente', type: Outfit })
  async saveOutfit(@Request() req, @Body() body: any) {
    const data = {
      user: { id: req.user.id } as any,
      superior: { id: body.superiorId } as any,
      inferior: { id: body.inferiorId } as any,
      accesorio: body.accesorioId ? { id: body.accesorioId } as any : null,
      clima: body.clima,
    };
    return this.outfitService.saveOutfit(data);
  }
}
