import { MaritalStatusEnum } from 'app/enum';
import { Person } from '../domain/interface/person.model';

export abstract class IBasicPersonnalInfoDTO
  implements Omit<Person, 'id' | 'createdAt' | 'updatedAt' | 'isActivated'>
{
  name: string;
  lastname: string;
  phone: string;
  address: string;
  maritalStatus?: MaritalStatusEnum;
}
export interface IUpdatePersonDTO extends Partial<IBasicPersonnalInfoDTO> {
  id: string;
}
