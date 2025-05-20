import { ITimestamp } from 'domain/interface';
import { Step } from './step.model';
import { Dossier } from './dossier.model';

export class IDomain extends ITimestamp {
  id: string;
  name: string;
  description?: string;
  isActivated: boolean;
  steps?: Step[];
  dossiers?: Dossier[];
}

export interface ODomain extends Partial<IDomain> {}
