import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IDomainService } from './domain.service.interface';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { CreateDomainDTO, UpdateDomainDTO } from './domain.input.dto';
import { IDsBodyDTO } from 'adapter/param.dto';

@UseGuards(StaffGuard)
@ApiBearerAuth()
@ApiTags('Domain management')
@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: IDomainService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un domain' })
  @ApiResponse({ status: 201, description: 'Domain créé.' })
  async create(@Body() dto: CreateDomainDTO) {
    return this.domainService.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un domain par id' })
  @ApiResponse({ status: 200, description: 'Domain trouvé.' })
  async findOne(@Param('id') id: string) {
    return this.domainService.fetchOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les domaines' })
  @ApiResponse({ status: 200, description: 'Liste des domaines.' })
  async findAll() {
    return this.domainService.fetchAll();
  }

  @Patch()
  @ApiOperation({ summary: 'Modifier un domain' })
  @ApiResponse({ status: 200, description: 'Domain modifié.' })
  async update(@Body() dto: UpdateDomainDTO) {
    return this.domainService.edit(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Supprimer un domain' })
  @ApiResponse({ status: 200, description: 'Domain supprimé.' })
  async remove(@Param() {ids}: IDsBodyDTO) {
    return this.domainService.remove(ids);
  }
}
