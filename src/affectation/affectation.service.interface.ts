import { Affectation } from 'domain/model/affectation.model';
import { Staff } from 'domain/model/staff.model';

export interface ICreateAffectationDTO {
  report: string;
  closedAt?: Date;
  dossierId: string;
  staffId: string;
  taskId?: string;
  
  user?: Staff
}

export interface IUpdateAffectationDTO extends Partial<ICreateAffectationDTO> {
  id: string;
}

export abstract class IAffectationService {
  abstract add(user: Staff, data: ICreateAffectationDTO): Promise<Affectation>;
  abstract fetchOne(id: string): Promise<Affectation>;
  abstract fetchAll(): Promise<Affectation[]>;
  abstract edit(data: IUpdateAffectationDTO): Promise<Affectation>;
  abstract remove(id: string): Promise<boolean>;
}
