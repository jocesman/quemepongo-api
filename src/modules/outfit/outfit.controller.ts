// outfit.controller.ts
import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { OutfitService } from './outfit.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Outfit } from '../../entities/outfit.entity';
import { RecommendationService } from '../recommendations/recommendation.service';

@ApiTags('Outfit')
@ApiBearerAuth()
@Controller('outfit')
export class OutfitController {
  constructor(
    private readonly outfitService: OutfitService,
    private readonly recommendationService: RecommendationService
  ) {}

  @Get('historial')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Historial de outfits generados' })
  @ApiResponse({ status: 200, type: [Outfit] })
  async historial(@Request() req) {
    return this.outfitService.findHistorialByUser(req.user.id);
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generar y guardar nuevo outfit' })
  @ApiResponse({ status: 201, type: Outfit })
  async generateAndSaveOutfit(@Request() req, @Body() body: { clima: string }) {
    // 1. Generar el outfit
    const generated = await this.recommendationService.generateOutfit(req.user.id, body.clima);
    
    // 2. Guardar el outfit
    const data = {
      user: { id: req.user.id } as any,
      superior: { id: generated.superior?.id } as any,
      inferior: { id: generated.inferior?.id } as any,
      accesorio: generated.accesorio?.id ? { id: generated.accesorio.id } as any : null,
      clima: body.clima,
    };
    
    return this.outfitService.saveOutfit(data);
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