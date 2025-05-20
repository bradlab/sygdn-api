import { MaritalStatusEnum, RoleEnum } from "app/enum";
import { Person } from "domain/interface/person.model";
import { Affectation } from './affectation.model';
import { IComment } from './comment.model';

export class Staff extends Person {
  role: RoleEnum;
  password: string;
  email?: string;
  degree?: string;
  code?: string;
  maritalStatus?: MaritalStatusEnum;
  affectations?: Affectation[];
  comments?: IComment[];
}

export interface OUser extends Partial<Staff> {}
