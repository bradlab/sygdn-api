import { Dossier, ODossier } from 'domain/model/dossier.model';
import { IDomain } from 'domain/model/domain.model';
import { ICreateDossierDTO } from 'dossier/dossier.service.interface';

export class DossierFactory {
  static create(data: ICreateDossierDTO, domain: IDomain): Dossier {
    const dossier = new Dossier();

    dossier.name = data.name;
    dossier.file = data.file;
    dossier.domain = domain;

    return dossier;
  }

  static getDossier(dossier: Dossier): ODossier {
    return {
      id: dossier.id,
      name: dossier.name,
      file: dossier.file,
      closedAt: dossier.closedAt,
      domain: dossier.domain,
      steps: [],
      comments: [],
      affectations: [],
      createdAt: dossier.createdAt,
      updatedAt: dossier.updatedAt,
    };
  }
}
