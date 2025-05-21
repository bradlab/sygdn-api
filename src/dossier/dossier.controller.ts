import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { IDossierService } from './dossier.service.interface';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { CreateDossierDTO, GqlUpdateDossierDTO, UpdateDossierDTO } from './dossier.input.dto';
import { DossierClientFilterDTO } from './dossier-client-filter.input';
import { BaseConfig } from 'config/base.config';
import { DossierFactory } from 'adapter/factory/dossier.factory';

@UseGuards(StaffGuard)
@ApiBearerAuth()
@ApiTags('Dossier management')
@Controller('dossiers')
export class DossierController {
  constructor(private readonly dossierService: IDossierService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un dossier' })
  @ApiResponse({ status: 201, description: 'Dossier créé.' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: BaseConfig.setFilePath,
        filename: BaseConfig.editFileName,
      }),
      fileFilter: BaseConfig.fileFilter,
    }),
  )
  async create(@Body() dto: CreateDossierDTO, @UploadedFile() file: any,) {
    dto.file = file ? file.filename : undefined;
    return DossierFactory.getDossier(await this.dossierService.add(dto));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un dossier par id' })
  @ApiResponse({ status: 200, description: 'Dossier trouvé.' })
  async findOne(@Param('id') id: string) {
    return DossierFactory.getDossier(await this.dossierService.fetchOne(id));
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les dossiers' })
  @ApiResponse({ status: 200, description: 'Liste des dossiers.' })
  async findAll() {
    const dossiers = await this.dossierService.fetchAll();
    return dossiers.map((dossier) => DossierFactory.getDossier(dossier));
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
    return DossierFactory.getDossier(await this.dossierService.edit(dto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un dossier' })
  @ApiResponse({ status: 200, description: 'Dossier supprimé.' })
  async remove(@Param('id') id: string) {
    return this.dossierService.remove(id);
  }
}
