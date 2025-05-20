import { Affectation } from 'domain/model/affectation.model';

export interface ICreateAffectationDTO {
  report: string;
  closedAt?: Date;
  dossierId: string;
  staffId: string;
  taskId?: string;
}

export interface IUpdateAffectationDTO extends Partial<ICreateAffectationDTO> {
  id: string;
}

export abstract class IAffectationService {
  abstract add(data: ICreateAffectationDTO): Promise<Affectation>;
  abstract fetchOne(id: string): Promise<Affectation>;
  abstract fetchAll(): Promise<Affectation[]>;
  abstract edit(data: IUpdateAffectationDTO): Promise<Affectation>;
  abstract remove(id: string): Promise<boolean>;
}
