import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ICommentService, ICreateCommentDTO, IUpdateCommentDTO } from './comment.service.interface';
import { IComment } from 'domain/model/comment.model';
import { IDBRepository } from 'app/abstract/db.abstract';
import { CommentFactory } from 'adapter/factory/comment.factory';

@Injectable()
export class CommentService implements ICommentService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(data: ICreateCommentDTO): Promise<IComment> {
    try {
      const dossier = await this.dbRepository.dossiers.findOneByID(data.dossierId);
      const staff = await this.dbRepository.users.findOneByID(data.staffId);
      if (!dossier) throw new NotFoundException('Dossier not found');
      if (!staff) throw new NotFoundException('Staff not found');
      return await this.dbRepository.comments.create(CommentFactory.create(data, staff, dossier));
    } catch (error) {
      this.logger.error(error, 'ERROR::CommentService.add');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<IComment> {
    const comment = await this.dbRepository.comments.findOneByID(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async fetchAll(): Promise<IComment[]> {
    try {
      return await this.dbRepository.comments.find();
    } catch (error) {
      this.logger.error(error, 'ERROR::CommentService.fetchAll');
      throw error;
    }
  }

  async edit(data: IUpdateCommentDTO): Promise<IComment> {
    try {
      const comment = await this.dbRepository.comments.findOneByID(data.id);
      if (!comment) throw new NotFoundException('Comment not found');
      let dossier = comment.dossier;
      let staff = comment.staff;
      if (data.dossierId && data.dossierId !== (comment.dossier as any)?.id) {
        dossier = await this.dbRepository.dossiers.findOneByID(data.dossierId);
        if (!dossier) throw new NotFoundException('Dossier not found');
      }
      if (data.staffId && data.staffId !== (comment.staff as any)?.id) {
        staff = await this.dbRepository.users.findOneByID(data.staffId);
        if (!staff) throw new NotFoundException('Staff not found');
      }
      const updated = { ...comment, ...data, dossier, staff };
      return this.dbRepository.comments.update(updated);
    } catch (error) {
      this.logger.error(error, 'ERROR::CommentService.edit');
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const comment = await this.dbRepository.comments.findOneByID(id);
      if (!comment) throw new NotFoundException('Comment not found');
      await this.dbRepository.comments.removeMany([comment]);
      return true;
    } catch (error) {
      this.logger.error(error, 'ERROR::CommentService.remove');
      throw error;
    }
  }
}
