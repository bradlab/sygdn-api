import { ITimestamp } from 'domain/interface';
import { Dossier } from './dossier.model';
import { Staff } from './staff.model';

export class IComment extends ITimestamp {
  id: string;
  content: string;
  dossier: Dossier;
  staff: Staff;
}

export interface OComment extends Partial<IComment> {}
