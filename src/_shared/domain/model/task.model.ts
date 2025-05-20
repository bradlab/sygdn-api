import { ITimestamp } from 'domain/interface';
import { Step } from './step.model';

export class ITask extends ITimestamp {
  id: string;
  name: string;
  description?: string;
  step: Step;
}

export interface OTask extends Partial<ITask> {}
