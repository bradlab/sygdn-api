import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  IDossierStepService,
  ICreateDossierStepDTO,
  IUpdateDossierStepDTO,
} from './dossier-step.service.interface';
import { DossierStep } from 'domain/model/dossier-step.model';
import { IDBRepository } from 'app/abstract/db.abstract';
import { DossierStepFactory } from 'adapter/factory/dossier-step.factory';

@Injectable()
export class DossierStepService implements IDossierStepService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(data: ICreateDossierStepDTO): Promise<DossierStep> {
    try {
      // Vérifier l'existence d'un DossierStep avec le même step et dossier
      const existing = await this.dbRepository.dossierSteps.findOne({
        where: { dossier: { id: data.dossierId }, step: { id: data.stepId } },
      });
      if (existing) {
        throw new ConflictException(
          'DossierStep with the same step already exists for this dossier',
        );
      }
      const dossier = await this.dbRepository.dossiers.findOne(
        {
          where: { id: data.dossierId },
          relations: {domain: true}
        },
      );
      if (!dossier) throw new NotFoundException('Dossier not found');
      // Vérifier l'existence du step
      const step = await this.dbRepository.steps.findOne({
        where: { id: data.stepId, domain: { id: dossier.domain.id } },
      });
      if (!step)
        throw new NotFoundException('Domain Step not found');
      return await this.dbRepository.dossierSteps.create(
        DossierStepFactory.create(data, dossier, step),
      );
    } catch (error) {
      this.logger.error(error, 'ERROR::DossierStepService.add');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<DossierStep> {
    return await this.dbRepository.dossierSteps.findOneByID(id);
  }

  async fetchAll(): Promise<DossierStep[]> {
    try {
        return this.dbRepository.dossierSteps.find();
    } catch (error) {
        this.logger.error(error, 'ERROR::DossierStepService.fetchAll');
        throw error;
    }
  }

  async edit(data: IUpdateDossierStepDTO): Promise<DossierStep> {
    try {
        const dossierStep = await this.dbRepository.dossierSteps.findOneByID(
          data.id,
        );
        if (!dossierStep) throw new NotFoundException('DossierStep not found');
        const updated = { ...dossierStep, ...data };
        return this.dbRepository.dossierSteps.update(updated);
    } catch (error) {
      this.logger.error(error, 'ERROR::DossierStepService.edit');
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
        const dossierStep = await this.dbRepository.dossierSteps.findOneByID(id);
        if (!dossierStep) throw new NotFoundException('DossierStep not found');
        await this.dbRepository.dossierSteps.removeMany([dossierStep]);
        return true;
    } catch (error) {
      this.logger.error(error, 'ERROR::DossierStepService.remove');
      throw error;
    }
  }
}
