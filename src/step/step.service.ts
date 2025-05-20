import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  ICreateStepDTO,
  IStepService,
  IUpdateStepDTO,
} from './step.service.interface';
import { Step } from 'domain/model/step.model';
import { IDBRepository } from 'app/abstract/db.abstract';
import { StepFactory } from 'adapter/factory/step.factory';

@Injectable()
export class StepService implements IStepService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(data: ICreateStepDTO): Promise<Step> {
    try {
        const domain = data.domainId && await this.dbRepository.domains.findOneByID(data.domainId);
      if (!domain) throw new NotFoundException('Domain not found');
      const existingStep = await this.dbRepository.steps.findOne({
        where: { name: data.name, domain: data.domainId },
      });
      if (existingStep) {
        throw new ConflictException(
          'Step with the same name already exists in this domain',
        );
      }
      return await this.dbRepository.steps.create(StepFactory.create(data, domain));
    } catch (error) {
      this.logger.error(error, 'ERROR::StepService.add');
      throw error;
    }
  }

  async fetchAll(): Promise<Step[]> {
    try {
      return await this.dbRepository.steps.find({
        relations: { domain: true },
      });
    } catch (error) {
      this.logger.error(error, 'ERROR::StepService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Step> {
    const step = await this.dbRepository.steps.findOneByID(id);
    if (!step) throw new NotFoundException('Step not found');
    return step;
  }

  async edit(input: IUpdateStepDTO): Promise<Step> {
    try {
      const step = await this.fetchOne(input.id);
      console.log('STEP ===', step);
      if (!step) throw new NotFoundException('Step not found');
      const updated = { ...step, ...input };
      return await this.dbRepository.steps.update(updated);
    } catch (error) {
      this.logger.error(error, 'ERROR::StepService.edit');
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const step = await this.dbRepository.steps.findOneByID(id);
      if (!step) throw new NotFoundException('Step not found');
      await this.dbRepository.steps.removeMany([step]);
      return true;
    } catch (error) {
      this.logger.error(error, 'ERROR::StepService.remove');
      throw error;
    }
  }
}
