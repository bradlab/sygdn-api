import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { ITaskService, ICreateTaskDTO, IUpdateTaskDTO } from './task.service.interface';
import { ITask } from 'domain/model/task.model';
import { IDBRepository } from 'app/abstract/db.abstract';
import { TaskFactory } from 'adapter/factory/task.factory';

@Injectable()
export class TaskService implements ITaskService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(data: ICreateTaskDTO): Promise<ITask> {
    try {
      const step = await this.dbRepository.steps.findOneByID(data.stepId);
      if (!step) throw new NotFoundException('Step not found');
      const existed = await this.dbRepository.tasks.findOne({
        where: {step: {id: data.stepId}, name: data.name}
      });
      if (existed) throw new ConflictException('A task with the same name allready exists for this step');
      return await this.dbRepository.tasks.create(TaskFactory.create(data, step));
    } catch (error) {
      this.logger.error(error, 'ERROR::TaskService.add');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<ITask> {
    const task = await this.dbRepository.tasks.findOneByID(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async fetchAll(): Promise<ITask[]> {
    try {
      return await this.dbRepository.tasks.find({order: {createdAt: 'DESC'}});
    } catch (error) {
      this.logger.error(error, 'ERROR::TaskService.fetchAll');
      throw error;
    }
  }

  async edit(data: IUpdateTaskDTO): Promise<ITask> {
    try {
      const task = await this.dbRepository.tasks.findOneByID(data.id);
      if (!task) throw new NotFoundException('Task not found');
      let step = task.step;
      if (data.stepId && data.stepId !== (task.step as any)?.id) {
        step = await this.dbRepository.steps.findOneByID(data.stepId);
        if (!step) throw new NotFoundException('Step not found');
      }
      const updated = { ...task, ...data, step };
      return this.dbRepository.tasks.update(updated);
    } catch (error) {
      this.logger.error(error, 'ERROR::TaskService.edit');
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const task = await this.dbRepository.tasks.findOneByID(id);
      if (!task) throw new NotFoundException('Task not found');
      await this.dbRepository.tasks.removeMany([task]);
      return true;
    } catch (error) {
      this.logger.error(error, 'ERROR::TaskService.remove');
      throw error;
    }
  }
}
