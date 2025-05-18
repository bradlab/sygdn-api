import { IDomain, ODomain } from "domain/model/domain.model";
import { ICreateDomainDTO, IUpdateDomainDTO } from "../../../domain/domain.service.interface";

export abstract class DomainFactory {
  static create(data: ICreateDomainDTO): IDomain {
    const domain = new IDomain();
    domain.name = data.name;
    domain.description = data.description;

    return domain;
  }

  static update(domain: IDomain, data: IUpdateDomainDTO): IDomain {
    domain.name = data.name ?? domain.name;
    domain.description = data.description ?? domain.description;

    return domain;
  }

  static getDomain(domain: IDomain): ODomain {
    if (domain) {
      return {
        id: domain.id,
        description: domain.description,
        name: domain.name,
        isActivated: domain.isActivated,
        createdAt: domain.createdAt,
        updatedAt: domain.updatedAt,
      };
    }
    return undefined as unknown as ODomain;
  }
}
