import { ITimestamp } from 'domain/interface';
import { IDomain } from './domain.model';
import { Affectation } from './affectation.model';
import { IComment } from './comment.model';
import { DossierStep } from './dossier-step.model';

export class Dossier extends ITimestamp {
  id: string;
  name: string;
  file: string; // upload file
  closedAt?: Date;
  domain: IDomain;
  steps?: DossierStep[];
  comments?: IComment[];
  affectations?: Affectation[];
}

export interface ODossier extends Partial<Dossier> {}
