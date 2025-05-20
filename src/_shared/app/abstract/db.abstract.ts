import { Staff } from "domain/model/staff.model";
import { IGenericRepository } from "domain/abstract/generic.repository";
import { IDomain } from "domain/model/domain.model";
import { Step } from "domain/model/step.model";
import { Affectation } from "domain/model/affectation.model";
import { IComment } from "domain/model/comment.model";
import { DossierStep } from "domain/model/dossier-step.model";
import { Dossier } from "domain/model/dossier.model";
import { ITask } from "domain/model/task.model";

export abstract class IDBRepository {
  abstract users: IGenericRepository<Staff>;
  abstract domains: IGenericRepository<IDomain>;
  abstract steps: IGenericRepository<Step>;
  abstract dossiers: IGenericRepository<Dossier>;
  abstract comments: IGenericRepository<IComment>;
  abstract tasks: IGenericRepository<ITask>;
  abstract dossierSteps: IGenericRepository<DossierStep>;
  abstract affectations: IGenericRepository<Affectation>;
}
