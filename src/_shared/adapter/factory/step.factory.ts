import { IDomain } from 'domain/model/domain.model';
import { OStep, Step } from 'domain/model/step.model';
import { ICreateStepDTO } from 'step/step.service.interface';

export class StepFactory {
  static create(data: ICreateStepDTO, domain: IDomain): Step {
    const step = new Step();
    step.name = data.name;
    step.description = data.description;
    step.duration = data.duration;
    step.order = data.order;
    step.domain = domain;

    return step;
  }

  static getStep(step: Step): OStep {
    return {
      id: step.id,
      name: step.name,
      description: step.description ?? '',
      duration: step.duration,
      order: step.order,
      domain: step.domain,
    };
  }
}
