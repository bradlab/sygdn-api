import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { StepResolver } from './step.resolver';
import { UserModule } from 'user/user.module';
import { IStepService } from './step.service.interface';
import { StepController } from './step.controller';

@Module({
  imports: [UserModule],
  providers: [{provide: IStepService, useClass: StepService}, StepResolver],
  controllers: [StepController],
  exports: [IStepService],
})
export class StepModule {}
