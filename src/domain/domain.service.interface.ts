import { IDomain } from 'domain/model/domain.model';

export interface ICreateDomainDTO {
  name: string;
  description?: string;
}
export interface IUpdateDomainDTO extends Partial<ICreateDomainDTO> {
  id: string;
}

export abstract class IDomainService {
  abstract add(data: ICreateDomainDTO): Promise<IDomain>;

  abstract fetchAll(): Promise<IDomain[]>;

  abstract fetchOne(id: string): Promise<IDomain | undefined>;

  abstract edit(data: IUpdateDomainDTO): Promise<IDomain | undefined>;

  abstract remove(ids: string[]): Promise<boolean>;
}