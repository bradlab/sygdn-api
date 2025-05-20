import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IStatistiqueService } from './statistique.service.interface';
import { StatistiqueQueryDto } from './statistique.query.dto';
import { StaffGuard } from 'adapter/guard/auth.guard';

@UseGuards(StaffGuard)
@ApiBearerAuth()
@ApiTags('Statistiques')
@Controller('statistiques')
export class StatistiqueController {
  constructor(private readonly stats: IStatistiqueService) {}

  @Get('dossiers-per-month')
  @ApiOperation({ summary: 'Nombre total de dossiers créés par mois (année en cours)' })
  @ApiResponse({ status: 200, description: 'Nombre de dossiers par mois.' })
  async dossiersPerMonth(@Query() query: StatistiqueQueryDto) {
    return this.stats.dossiersPerMonth(query);
  }

  @Get('dossiers-status-distribution')
  @ApiOperation({ summary: 'Répartition des dossiers par statut' })
  @ApiResponse({ status: 200, description: 'Répartition des dossiers.' })
  async dossiersStatusDistribution(@Query() query: StatistiqueQueryDto) {
    return this.stats.dossiersStatusDistribution(query);
  }

  @Get('average-dossier-processing-time')
  @ApiOperation({ summary: 'Temps moyen de traitement d’un dossier (jour)' })
  @ApiResponse({ status: 200, description: 'Temps moyen de traitement.' })
  async averageDossierProcessingTime(@Query() query: StatistiqueQueryDto) {
    return this.stats.averageDossierProcessingTime(query);
  }

  @Get('late-tasks-by-staff')
  @ApiOperation({ summary: 'Nombre de tâches en retard par utilisateur (staff)' })
  @ApiResponse({ status: 200, description: 'Tâches en retard par staff.' })
  async lateTasksByStaff(@Query() query: StatistiqueQueryDto) {
    return this.stats.lateTasksByStaff(query);
  }

  @Get('top-dossiers-by-comments')
  @ApiOperation({ summary: 'Top 5 des dossiers avec le plus de commentaires' })
  @ApiResponse({ status: 200, description: 'Top dossiers par nombre de commentaires.' })
  async topDossiersByComments(@Query() query: StatistiqueQueryDto) {
    return this.stats.topDossiersByComments(query);
  }
}
