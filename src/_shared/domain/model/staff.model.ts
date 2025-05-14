import { MaritalStatusEnum, RoleEnum } from "app/enum";
import { Person } from "domain/interface/person.model";

export interface Staff extends Person {
  role: RoleEnum;
  password: string;
  email?: string;
  degree?: string;
  code?: string;
  maritalStatus?: MaritalStatusEnum;
}

