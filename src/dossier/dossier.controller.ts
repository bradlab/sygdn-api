import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IDossierService } from './dossier.service.interface';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { CreateDossierDTO, UpdateDossierDTO } from './dossier.input.dto';
import { DossierClientFilterDTO } from './dossier-client-filter.input';

@UseGuards(StaffGuard)
@ApiTags('Dossier management')
@Controller('dossiers')
export class DossierController {
  constructor(private readonly dossierService: IDossierService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un dossier' })
  @ApiResponse({ status: 201, description: 'Dossier créé.' })
  async create(@Body() dto: CreateDossierDTO) {
    return this.dossierService.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un dossier par id' })
  @ApiResponse({ status: 200, description: 'Dossier trouvé.' })
  async findOne(@Param('id') id: string) {
    return this.dossierService.fetchOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les dossiers' })
  @ApiResponse({ status: 200, description: 'Liste des dossiers.' })
  async findAll() {
    return this.dossierService.fetchAll();
  }

  @Get('by-client-with-details')
  @ApiOperation({ summary: 'Récupérer tous les dossiers d\'un client avec étapes, tâches et commentaires filtrés' })
  @ApiResponse({ status: 200, description: 'Dossiers détaillés paginés.' })
  async findAllByClientWithDetails(@Body() filter: DossierClientFilterDTO) {
    return this.dossierService.findAllByClientWithDetails(filter);
  }

  @Patch()
  @ApiOperation({ summary: 'Modifier un dossier' })
  @ApiResponse({ status: 200, description: 'Dossier modifié.' })
  async update(@Body() dto: UpdateDossierDTO) {
    return this.dossierService.edit(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un dossier' })
  @ApiResponse({ status: 200, description: 'Dossier supprimé.' })
  async remove(@Param('id') id: string) {
    return this.dossierService.remove(id);
  }
}
