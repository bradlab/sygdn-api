import { StepStatusEnum } from "app/enum";

export interface IStatisticQueryDTO {
  year?: number;
  status?: StepStatusEnum;
  staffId?: string;
  limit?: number;
  dossierId?: string;
}

export abstract class IStatistiqueService {
  abstract dossiersPerMonth(query: IStatisticQueryDTO): Promise<any[]>;
  abstract dossiersStatusDistribution(
    query: IStatisticQueryDTO,
  ): Promise<any[]>;
  abstract averageDossierProcessingTime(
    query: IStatisticQueryDTO,
  ): Promise<any>;
  abstract lateTasksByStaff(query: IStatisticQueryDTO): Promise<any[]>;
  abstract topDossiersByComments(query: IStatisticQueryDTO): Promise<any[]>;
}
