import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateStepDTO, GqlUpdateStepDTO } from './step.input.dto';
import { Step } from 'domain/model/step.model';
import { StepEntity } from 'framework/schema/step.entity';
import { IStepService } from './step.service.interface';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'adapter/guard/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(GqlAuthGuard)
@ApiTags('Domain step management')
@ApiBearerAuth()
@Resolver(() => StepEntity)
export class StepResolver {
  constructor(private readonly stepService: IStepService) {}

  @Query(() => [StepEntity], { name: 'steps' })
  async getAllSteps(): Promise<Step[]> {
    return this.stepService.fetchAll();
  }

  @Query(() => StepEntity, { name: 'step' })
  async getStepById(@Args('id') id: string): Promise<Step> {
    return this.stepService.fetchOne(id);
  }

  @Mutation(() => StepEntity)
  async createStep(@Args('input') data: CreateStepDTO): Promise<Step> {
    return this.stepService.add(data);
  }

  @Mutation(() => StepEntity)
  async updateStep(
    @Args('id') id: string,
    @Args('input') data: GqlUpdateStepDTO,
  ): Promise<Step> {
    return this.stepService.edit(data);
  }

  @Mutation(() => Boolean)
  async deleteStep(@Args('id') id: string): Promise<boolean> {
    return this.stepService.remove(id);
  }
}
