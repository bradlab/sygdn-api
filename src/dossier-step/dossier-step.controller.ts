import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { CreateDossierStepDTO, UpdateDossierStepDTO } from './dossier-step.input.dto';
import { IDossierStepService } from './dossier-step.service.interface';

@UseGuards(StaffGuard)
@ApiTags('DossierStep')
@Controller('dossier.steps')
export class DossierStepController {
  constructor(private readonly dossierStepService: IDossierStepService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un dossier-step' })
  @ApiResponse({ status: 201, description: 'DossierStep créé.' })
  async create(@Body() dto: CreateDossierStepDTO) {
    return this.dossierStepService.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un dossier-step par id' })
  @ApiResponse({ status: 200, description: 'DossierStep trouvé.' })
  async findOne(@Param('id') id: string) {
    return this.dossierStepService.fetchOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les dossier-steps' })
  @ApiResponse({ status: 200, description: 'Liste des dossier-steps.' })
  async findAll() {
    return this.dossierStepService.fetchAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un dossier-step' })
  @ApiResponse({ status: 200, description: 'DossierStep modifié.' })
  async update(@Body() dto: UpdateDossierStepDTO) {
    return this.dossierStepService.edit(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un dossier-step' })
  @ApiResponse({ status: 200, description: 'DossierStep supprimé.' })
  async remove(@Param('id') id: string) {
    return this.dossierStepService.remove(id);
  }
}
