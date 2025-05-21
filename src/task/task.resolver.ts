import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ITask } from 'domain/model/task.model';
import { CreateTaskDTO, GqlUpdateTaskDTO } from './task.input.dto';
import { GqlAuthGuard } from 'adapter/guard/auth.guard';
import { ITaskService } from './task.service.interface';
import { TaskEntity } from 'framework/schema/task.entity';

@ApiTags('Tasks of step management')
@ApiBearerAuth()
@Resolver(() => TaskEntity)
@UseGuards(GqlAuthGuard)
export class TaskResolver {
  constructor(private readonly taskService: ITaskService) {}

  @Query(() => [TaskEntity], { name: 'tasks', description: 'Afficher la liste des tâches' })
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
  async updateTask(@Args('data') data: GqlUpdateTaskDTO): Promise<ITask> {
    return this.taskService.edit(data);
  }

  @Mutation(() => Boolean)
  async removeTask(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.taskService.remove(id);
  }
}
