import { ITimestamp } from 'domain/interface';
import { Dossier } from './dossier.model';
import { Staff } from './staff.model';
import { ITask } from './task.model';

export class Affectation extends ITimestamp {
  id: string;
  report: string;
  closedAt?: Date;
  dossier: Dossier;
  staff: Staff;
  Task: ITask;
}

export interface OAffectation extends Partial<Affectation> {}
