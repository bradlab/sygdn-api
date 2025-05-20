import { StepStatusEnum } from 'app/enum';
import { Dossier } from 'domain/model/dossier.model';

export interface ICreateDossierDTO {
  name: string;
  file: string;
  closedAt?: Date;
  domainId: string;
}

export interface IUpdateDossierDTO extends Partial<ICreateDossierDTO> {
  id: string;
}

export interface IDossierClientFilterDTO {
  clientId: string;
  staffId?: string;
  status?: StepStatusEnum;
  page?: number;
  pageSize?: number;
  [key: string]: any;
}

export abstract class IDossierService {
  abstract add(data: ICreateDossierDTO): Promise<Dossier>;
  abstract fetchOne(id: string): Promise<Dossier>;
  abstract fetchAll(): Promise<Dossier[]>;
  abstract edit(data: IUpdateDossierDTO): Promise<Dossier>;
  abstract remove(id: string): Promise<boolean>;
  abstract findAllByClientWithDetails(
    filter: IDossierClientFilterDTO,
  ): Promise<any>;
}
