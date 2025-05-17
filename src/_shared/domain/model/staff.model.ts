import { MaritalStatusEnum, RoleEnum } from "app/enum";
import { Person } from "domain/interface/person.model";

export class Staff extends Person {
  role: RoleEnum;
  password: string;
  email?: string;
  degree?: string;
  code?: string;
  maritalStatus?: MaritalStatusEnum;
}

export interface OUser extends Partial<Staff> {
}
