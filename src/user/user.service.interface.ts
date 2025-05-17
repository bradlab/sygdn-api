import { RoleEnum } from 'app/enum';
import { IBasicPersonnalInfoDTO } from 'app/person.input.dto';
import { IUserQuery } from 'auth/auth.service.interface';
import { Staff } from 'domain/model/staff.model';
import { PartialDeep } from 'domain/types';

export interface ICreateUserDTO extends IBasicPersonnalInfoDTO {
  email?: string;
  password: string;
  role: RoleEnum;
  degree?: string;
  avatar?: string;
}

export interface IUpdateUserDTO extends Partial<ICreateUserDTO> {
  id: string;
}

export abstract class IUserService {
  abstract add(data: ICreateUserDTO): Promise<Staff>;

  abstract fetchAll(param?: IUserQuery): Promise<Staff[]>;

  abstract search(
    data: PartialDeep<Staff>,
    withAccess?: boolean,
  ): Promise<Staff>;

  abstract fetchOne(id: string): Promise<Staff>;

  abstract edit(data: IUpdateUserDTO): Promise<Staff>;

  abstract setState(ids: string[]): Promise<boolean>;

  abstract remove(id: string): Promise<boolean>;

  abstract clean(): Promise<boolean>;
}
