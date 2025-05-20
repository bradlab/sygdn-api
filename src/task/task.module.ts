import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { UserModule } from 'user/user.module';
import { ITaskService } from './task.service.interface';
import { TaskController } from './task.controller';

@Module({
  imports: [UserModule],
    controllers: [TaskController],
    providers: [
      { provide: ITaskService, useClass: TaskService },
      TaskResolver,
    ],
    exports: [ITaskService],
})
export class TaskModule {}
