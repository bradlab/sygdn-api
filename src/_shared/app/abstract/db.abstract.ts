import { Staff } from "domain/model/staff.model";
import { IGenericRepository } from "domain/abstract/generic.repository";
import { IDomain } from "domain/model/domain.model";
import { Step } from "domain/model/step.model";

export abstract class IDBRepository {
  abstract users: IGenericRepository<Staff>;
  abstract domains: IGenericRepository<IDomain>;
  abstract steps: IGenericRepository<Step>;
}
