import { Step } from 'domain/model/step.model';
import { ITask, OTask } from 'domain/model/task.model';
import { ICreateTaskDTO } from 'task/task.service.interface';

export class TaskFactory {
  static create(data: ICreateTaskDTO, step: Step): ITask {
    const task = new ITask();
    task.name = data.name;
    task.description = data.description;
    task.step = step;

    return task;
  }

  static getTask(task: ITask): OTask {
    return {
        id: task.id,
        name: task.name,
        description: task.description,
        step: task.step,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
    };
  }
}
