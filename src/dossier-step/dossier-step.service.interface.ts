import { StepStatusEnum } from 'app/enum';
import { DossierStep } from 'domain/model/dossier-step.model';

export interface ICreateDossierStepDTO {
  startDate: Date;
  endDate?: Date;
  status: StepStatusEnum;
  dossierId: string;
  stepId: string;
}

export interface IUpdateDossierStepDTO extends Partial<ICreateDossierStepDTO> {
  id: string;
}

export abstract class IDossierStepService {
  abstract add(data: ICreateDossierStepDTO): Promise<DossierStep>;
  abstract fetchOne(id: string): Promise<DossierStep>;
  abstract fetchAll(): Promise<DossierStep[]>;
  abstract edit(data: IUpdateDossierStepDTO): Promise<DossierStep>;
  abstract remove(id: string): Promise<boolean>;
}
