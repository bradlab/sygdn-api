import { ITimestamp } from 'domain/interface';
import { Staff } from './staff.model';
import { ITask } from './task.model';
import { DossierStep } from './dossier-step.model';

export class Affectation extends ITimestamp {
  id: string;
  report: string;
  closedAt?: Date;
  dossierStep: DossierStep;
  staff: Staff;
  user?: Staff;
  task: ITask;
}

export interface OAffectation extends Partial<Affectation> {}
