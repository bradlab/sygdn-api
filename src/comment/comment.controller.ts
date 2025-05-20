import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.input.dto';
import { ICommentService } from './comment.service.interface';

@UseGuards(StaffGuard)
@ApiTags('Comment management')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: ICommentService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un commentaire' })
  @ApiResponse({ status: 201, description: 'Commentaire créé.' })
  async create(@Body() dto: CreateCommentDTO) {
    return this.commentService.add(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un commentaire par id' })
  @ApiResponse({ status: 200, description: 'Commentaire trouvé.' })
  async findOne(@Param('id') id: string) {
    return this.commentService.fetchOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les commentaires' })
  @ApiResponse({ status: 200, description: 'Liste des commentaires.' })
  async findAll() {
    return this.commentService.fetchAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un commentaire' })
  @ApiResponse({ status: 200, description: 'Commentaire modifié.' })
  async update(@Body() dto: UpdateCommentDTO) {
    return this.commentService.edit(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un commentaire' })
  @ApiResponse({ status: 200, description: 'Commentaire supprimé.' })
  async remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
