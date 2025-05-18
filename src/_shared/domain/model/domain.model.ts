import { ITimestamp } from 'domain/interface';

export class IDomain extends ITimestamp {
  id: string;
  name: string;
  description?: string;
  isActivated: boolean;
}

export interface ODomain extends Partial<IDomain> {}
