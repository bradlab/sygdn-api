import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AffectationService } from './affectation.service';
import { GetUser } from 'adapter/decorator';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { Staff } from 'domain/model/staff.model';
import { CreateAffectationDTO, UpdateAffectationDTO } from './affectation.input.dto';
import { IAffectationService } from './affectation.service.interface';

@UseGuards(StaffGuard)
@ApiBearerAuth()
@ApiTags('Affectation management')
@Controller('affectations')
export class AffectationController {
  constructor(private readonly affectationService: IAffectationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une affectation' })
  @ApiResponse({ status: 201, description: 'Affectation créée.' })
  async create(@GetUser() user: Staff, @Body() dto: CreateAffectationDTO) {
    return this.affectationService.add(user, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une affectation par id' })
  @ApiResponse({ status: 200, description: 'Affectation trouvée.' })
  async findOne(@Param('id') id: string) {
    return this.affectationService.fetchOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les affectations' })
  @ApiResponse({ status: 200, description: 'Liste des affectations.' })
  async findAll() {
    return this.affectationService.fetchAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une affectation' })
  @ApiResponse({ status: 200, description: 'Affectation modifiée.' })
  async update(@Body() dto: UpdateAffectationDTO) {
    return this.affectationService.edit(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une affectation' })
  @ApiResponse({ status: 200, description: 'Affectation supprimée.' })
  async remove(@Param('id') id: string) {
    return this.affectationService.remove(id);
  }
}
