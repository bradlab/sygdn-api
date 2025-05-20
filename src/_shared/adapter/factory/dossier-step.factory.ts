import { DossierStep, ODossierStep } from 'domain/model/dossier-step.model';
import { Dossier } from 'domain/model/dossier.model';
import { Step } from 'domain/model/step.model';
import { ICreateDossierStepDTO } from 'dossier-step/dossier-step.service.interface';

export class DossierStepFactory {
  static create(data: ICreateDossierStepDTO, dossier: Dossier, step: Step): DossierStep {
    const dossierStep = new DossierStep();
    dossierStep.startDate = data.startDate;
    dossierStep.endDate = data.endDate;
    dossierStep.status = data.status;
    dossierStep.dossier = dossier;
    dossierStep.step = step;

    return dossierStep;
  }

  static getDossierStep(dossierStep: DossierStep): ODossierStep {
    return {
      id: dossierStep.id,
      startDate: dossierStep.startDate,
      endDate: dossierStep.endDate,
      status: dossierStep.status,
      dossier: dossierStep.dossier,
      step: dossierStep.step,
      createdAt: dossierStep.createdAt,
      updatedAt: dossierStep.updatedAt,
    };
  }
}
