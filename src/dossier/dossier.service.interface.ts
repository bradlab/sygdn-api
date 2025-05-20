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

export abstract class IDossierService {
  abstract add(data: ICreateDossierDTO): Promise<Dossier>;
  abstract fetchOne(id: string): Promise<Dossier>;
  abstract fetchAll(): Promise<Dossier[]>;
  abstract edit(data: IUpdateDossierDTO): Promise<Dossier>;
  abstract remove(id: string): Promise<boolean>;
}
