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
import { DataHelper } from 'adapter/helper/data.helper';
import { StepStatusEnum } from 'app/enum';

@Injectable()
export class AffectationService implements IAffectationService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(user: Staff, data: ICreateAffectationDTO): Promise<boolean> {
    try {
      data.user = user;
      // Vérifier l'existence des dépendances
      const dossier = await this.dbRepository.dossierSteps.findOne({
        where: { id: data.dossierStepId },
        relations: { dossier: true, step: true },
      });
      if (!dossier) throw new NotFoundException('Dossier not found');
      const staff = await this.dbRepository.users.findOneByID(data.staffId);
      if (!staff) throw new NotFoundException('Staff not found');
      let task = undefined as unknown as ITask;
      const affectations: Affectation[] = [];
      if (data.taskId) {
        task = await this.dbRepository.tasks.findOneByID(data.taskId);
        if (!task) throw new NotFoundException('Task not found');

        affectations.push(
          AffectationFactory.create(data, dossier, task, staff),
        );
      } else {
        if (dossier.step) {
          const tasks = await this.dbRepository.tasks.find({
            where: { step: { id: dossier.step.id } },
          });
          if (tasks && DataHelper.isNotEmptyArray(tasks)) {
            tasks.map((task) => {
              affectations.push(
                AffectationFactory.create(data, dossier, task, staff),
              );
            });
          } else {
            throw new NotFoundException('Task not found');
          }

        }
      }
      // Vérifier l'unicité de l'affectation
      const existing = await this.dbRepository.affectations.findOne({
        where: {
          dossierStep: { id: data.dossierStepId },
          staff: { id: data.staffId },
          task: data.taskId ? { id: data.taskId } : undefined,
        },
      });
      if (existing) {
        throw new ConflictException(
          'Affectation with the same staff, dossier, and task already exists',
        );
      }
      return await this.dbRepository.affectations
        .createMany(affectations)
        .then(() => true)
        .catch(() => false);
    } catch (error) {
      this.logger.error(error, 'ERROR::AffectationService.add');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Affectation> {
    const affectation = await this.dbRepository.affectations.findOne({
      relations: { dossierStep: true, task: true, staff: true, user: true },
      where: { id },
    });
    if (!affectation) throw new NotFoundException('Affectation not found');
    return affectation;
  }

  async fetchAll(): Promise<Affectation[]> {
    return this.dbRepository.affectations.find({
      order: { createdAt: 'DESC' },
    });
  }

  async edit(user: Staff, data: IUpdateAffectationDTO): Promise<Affectation> {
    const affectation = await this.dbRepository.affectations.findOne({
      relations: { dossierStep: true, staff: true, user: true },
      where: {id: data.id},
    });
    if (!affectation) throw new NotFoundException('Affectation not found');
    const dossier = affectation.dossierStep;
    if (dossier && dossier.status === StepStatusEnum.PENDING) {
      dossier.status = StepStatusEnum.IN_PROGRESS;
      await this.dbRepository.dossierSteps.update(dossier);
    }
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
