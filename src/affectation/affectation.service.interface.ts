import { Affectation } from 'domain/model/affectation.model';
import { Staff } from 'domain/model/staff.model';

export interface ICreateAffectationDTO {
  report: string;
  closedAt?: Date;
  dossierStepId: string;
  staffId: string;
  taskId?: string;
  
  user?: Staff
}

export interface IUpdateAffectationDTO extends Partial<ICreateAffectationDTO> {
  id: string;
}

export abstract class IAffectationService {
  abstract add(user: Staff, data: ICreateAffectationDTO): Promise<boolean>;
  abstract fetchOne(id: string): Promise<Affectation>;
  abstract fetchAll(): Promise<Affectation[]>;
  abstract edit(user: Staff, data: IUpdateAffectationDTO): Promise<Affectation>;
  abstract remove(id: string): Promise<boolean>;
}
