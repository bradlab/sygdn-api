import { ITimestamp } from 'domain/interface';
import { IDomain } from 'domain/model/domain.model';

export class Step extends ITimestamp {
  id: string;
  name: string;
  description?: string;
  duration: number; // en jours
  order: number; // ordre de passage du dossier
  domain: IDomain; // relation avec le domaine
}

export interface OStep extends Partial<Step> {}
