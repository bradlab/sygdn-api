import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { CreateTaskDTO, UpdateTaskDTO } from './task.input.dto';
import { ITaskService } from './task.service.interface';

@UseGuards(StaffGuard)
@ApiTags('Step tasks management')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une tâche' })
  @ApiResponse({ status: 201, description: 'Tâche créée.' })
  async create(@Body() dto: CreateTaskDTO) {
    return this.taskService.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par id' })
  @ApiResponse({ status: 200, description: 'Tâche trouvée.' })
  async findOne(@Param('id') id: string) {
    return this.taskService.fetchOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les tâches' })
  @ApiResponse({ status: 200, description: 'Liste des tâches.' })
  async findAll() {
    return this.taskService.fetchAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une tâche' })
  @ApiResponse({ status: 200, description: 'Tâche modifiée.' })
  async update(@Body() dto: UpdateTaskDTO) {
    return this.taskService.edit(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiResponse({ status: 200, description: 'Tâche supprimée.' })
  async remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
