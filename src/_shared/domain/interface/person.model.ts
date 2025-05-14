import { ITimestamp } from 'domain/interface';

export class Person extends ITimestamp {
  id: string;
  name: string;
  phone: string;
  address: string;
  avatar?: string;
  isActivated?: boolean;
}
