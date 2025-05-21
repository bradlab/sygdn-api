import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { CreateStepDTO, GqlUpdateStepDTO, UpdateStepDTO } from './step.input.dto';
import { IStepService } from './step.service.interface';

@UseGuards(StaffGuard)
@ApiBearerAuth()
@ApiTags('Step management')
@Controller('steps')
export class StepController {
  constructor(private readonly stepService: IStepService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une étape' })
  @ApiResponse({ status: 201, description: 'Étape créée.' })
  async create(@Body() dto: CreateStepDTO) {
    return this.stepService.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une étape par id' })
  @ApiResponse({ status: 200, description: 'Étape trouvée.' })
  async findOne(@Param('id') id: string) {
    return this.stepService.fetchOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les étapes' })
  @ApiResponse({ status: 200, description: 'Liste des étapes.' })
  async findAll() {
    return this.stepService.fetchAll();
  }

  @Patch()
  @ApiOperation({ summary: 'Modifier une étape' })
  @ApiResponse({ status: 200, description: 'Étape modifiée.' })
  async update(@Body() dto: UpdateStepDTO) {
    return this.stepService.edit(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une étape' })
  @ApiResponse({ status: 200, description: 'Étape supprimée.' })
  async remove(@Param('id') id: string) {
    return this.stepService.remove(id);
  }
}
