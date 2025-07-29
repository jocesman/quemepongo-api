//outfit.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
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
}
