import { Staff } from "domain/model/staff.model";
import { IGenericRepository } from "../../domain/abstract/generic.repository";

export abstract class IDBRepository {
  abstract users: IGenericRepository<Staff>;
}
