import { ITimestamp } from 'domain/interface';
import { Dossier } from './dossier.model';
import { Step } from './step.model';
import { StepStatusEnum } from 'app/enum';

export class DossierStep extends ITimestamp {
  id: string;
  startDate: Date;
  endDate?: Date;
  status: StepStatusEnum;
  dossier: Dossier;
  step: Step;
}

export interface ODossierStep extends Partial<DossierStep> {}
