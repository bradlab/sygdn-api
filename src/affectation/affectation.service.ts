import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  IAffectationService,
  ICreateAffectationDTO,
  IUpdateAffectationDTO,
} from './affectation.service.interface';
import { Affectation } from 'domain/model/affectation.model';
import { IDBRepository } from 'app/abstract/db.abstract';
import { AffectationFactory } from 'adapter/factory/affectation.factory';
import { ITask } from 'domain/model/task.model';
import { Staff } from 'domain/model/staff.model';

@Injectable()
export class AffectationService implements IAffectationService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(user: Staff, data: ICreateAffectationDTO): Promise<Affectation> {
    try {
      data.user = user;
      // Vérifier l'existence des dépendances
      const dossier = await this.dbRepository.dossierSteps.findOneByID(
        data.dossierId,
      );
      if (!dossier) throw new NotFoundException('Dossier not found');
      const staff = await this.dbRepository.users.findOneByID(data.staffId);
      if (!staff) throw new NotFoundException('Staff not found');
      let task = undefined as unknown as ITask;
      if (data.taskId) {
        task = await this.dbRepository.tasks.findOneByID(data.taskId);
        if (!task) throw new NotFoundException('Task not found');
      }
      // Vérifier l'unicité de l'affectation
      const existing = await this.dbRepository.affectations.findOne({
        where: {
          dossierStep: { id: data.dossierId },
          staff: { id: data.staffId },
          task: { id: data.taskId },
        },
      });
      if (existing) {
        throw new ConflictException(
          'Affectation with the same staff, dossier, and task already exists',
        );
      }
      return await this.dbRepository.affectations.create(
        AffectationFactory.create(data, dossier, task, staff),
      );
    } catch (error) {
      this.logger.error(error, 'ERROR::AffectationService.add');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Affectation> {
    const affectation = await this.dbRepository.affectations.findOneByID(id);
    if (!affectation) throw new NotFoundException('Affectation not found');
    return affectation;
  }

  async fetchAll(): Promise<Affectation[]> {
    return this.dbRepository.affectations.find();
  }

  async edit(data: IUpdateAffectationDTO): Promise<Affectation> {
    const affectation = await this.dbRepository.affectations.findOneByID(
      data.id,
    );
    if (!affectation) throw new NotFoundException('Affectation not found');
    const updated = { ...affectation, ...data };
    return this.dbRepository.affectations.update(updated);
  }

  async remove(id: string): Promise<boolean> {
    const affectation = await this.dbRepository.affectations.findOneByID(id);
    if (!affectation) throw new NotFoundException('Affectation not found');
    await this.dbRepository.affectations.removeMany([affectation]);
    return true;
  }
}
