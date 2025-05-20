// Interface du service Step

import { Step } from "domain/model/step.model";

export interface ICreateStepDTO {
  domainId: string; // id du domaine
  name: string;
  description?: string;
  duration: number; // en jours
  order: number; // ordre de passage du dossier
}

export interface IUpdateStepDTO extends Partial<ICreateStepDTO> {
  id: string;
}

export abstract class IStepService {
  abstract add(data: ICreateStepDTO): Promise<Step>;
  abstract fetchOne(id: string): Promise<Step>;
  abstract fetchAll(): Promise<Step[]>;
  abstract edit(data: IUpdateStepDTO): Promise<Step>;
  abstract remove(id: string): Promise<boolean>;
}
