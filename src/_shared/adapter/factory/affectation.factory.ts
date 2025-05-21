import { Affectation, OAffectation } from 'domain/model/affectation.model';
import { ICreateAffectationDTO } from 'affectation/affectation.service.interface';
import { StaffFactory } from './user.factory';
import { Staff } from 'domain/model/staff.model';
import { DossierStep } from 'domain/model/dossier-step.model';
import { ITask } from 'domain/model/task.model';
import { TaskFactory } from './task.factory';

export class AffectationFactory {
  static create(data: ICreateAffectationDTO, dossier: DossierStep, task: ITask, staff: Staff): Affectation {
    const affectation = new Affectation();
    affectation.report = data.report;
    affectation.closedAt = data.closedAt;

    affectation.dossierStep = dossier;
    affectation.task = task;
    affectation.staff = staff;
    affectation.user = data.user;

    return affectation;
  }

  static getAffectation(affectation: Affectation): OAffectation {
    if (!affectation) return undefined as unknown as OAffectation;
   return {
      id: affectation.id,
      report: affectation.report,
      closedAt: affectation.closedAt,
      dossierStep: affectation.dossierStep,
      staff: StaffFactory.getUser(affectation.staff) as Staff,
      task: TaskFactory.getTask(affectation.task) as ITask,
      user: StaffFactory.getUser(affectation.user!) as Staff,
      createdAt: affectation.createdAt,
      updatedAt: affectation.updatedAt,
    };
  }
}
