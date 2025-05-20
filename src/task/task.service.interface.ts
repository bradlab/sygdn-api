import { ITask } from 'domain/model/task.model';

export interface ICreateTaskDTO {
  name: string;
  description?: string;
  dossierStepId: string;
}

export interface IUpdateTaskDTO extends Partial<ICreateTaskDTO> {
  id: string;
}

export abstract class ITaskService {
  abstract add(data: ICreateTaskDTO): Promise<ITask>;
  abstract fetchOne(id: string): Promise<ITask>;
  abstract fetchAll(): Promise<ITask[]>;
  abstract edit(data: IUpdateTaskDTO): Promise<ITask>;
  abstract remove(id: string): Promise<boolean>;
}
