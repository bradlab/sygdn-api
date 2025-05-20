import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { ITask } from 'domain/model/task.model';
import { CreateTaskDTO, UpdateTaskDTO } from './task.input.dto';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { ITaskService } from './task.service.interface';
import { TaskEntity } from 'framework/schema/task.entity';

@ApiTags('Tasks of step management')
@ApiBearerAuth()
@Resolver(() => TaskEntity)
@UseGuards(StaffGuard)
export class TaskResolver {
  constructor(private readonly taskService: ITaskService) {}

  @Query(() => [TaskEntity], { name: 'tasks' })
  async fetchAll(): Promise<ITask[]> {
    return this.taskService.fetchAll();
  }

  @Query(() => TaskEntity, { name: 'task', nullable: true })
  async fetchOne(@Args('id', { type: () => ID }) id: string): Promise<ITask> {
    return this.taskService.fetchOne(id);
  }

  @Mutation(() => TaskEntity)
  async createTask(@Args('data') data: CreateTaskDTO): Promise<ITask> {
    return this.taskService.add(data);
  }

  @Mutation(() => TaskEntity)
  async updateTask(@Args('data') data: UpdateTaskDTO): Promise<ITask> {
    return this.taskService.edit(data);
  }

  @Mutation(() => Boolean)
  async removeTask(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.taskService.remove(id);
  }
}
