import { Dossier, ODossier } from 'domain/model/dossier.model';
import { IDomain } from 'domain/model/domain.model';
import { ICreateDossierDTO } from 'dossier/dossier.service.interface';
import { DataHelper } from 'adapter/helper/data.helper';
import { DossierStepFactory } from './dossier-step.factory';
import { DossierStep } from 'domain/model/dossier-step.model';
import { Affectation } from 'domain/model/affectation.model';
import { AffectationFactory } from './affectation.factory';

export class DossierFactory {
  static create(data: ICreateDossierDTO, domain: IDomain): Dossier {
    const dossier = new Dossier();

    dossier.name = data.name;
    dossier.file = data.file;
    dossier.description = data.description;
    dossier.domain = domain;

    return dossier;
  }

  static getDossier(dossier: Dossier): ODossier {
    if (!dossier) return undefined as unknown as ODossier;
    return {
      id: dossier.id,
      name: dossier.name,
      file: DataHelper.getFileLink(dossier.file),
      description: dossier.description,
      closedAt: dossier.closedAt,
      domain: dossier.domain,
      steps:
        (dossier.steps?.map((step) =>
          DossierStepFactory.getDossierStep(step),
        ) as DossierStep[]) || [],
      comments: dossier.comments,
      affectations: dossier.affectations?.map((affectation) =>
        AffectationFactory.getAffectation(affectation),
      ) as Affectation[],
      createdAt: dossier.createdAt,
      updatedAt: dossier.updatedAt,
    };
  }
}
