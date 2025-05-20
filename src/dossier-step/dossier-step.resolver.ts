import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DossierStep } from 'domain/model/dossier-step.model';
import { CreateDossierStepDTO, UpdateDossierStepDTO } from './dossier-step.input.dto';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { IDossierStepService } from './dossier-step.service.interface';
import { DossierStepEntity } from 'framework/schema/dossier-step.entity';

@ApiTags('DossierStep')
@ApiBearerAuth()
@Resolver(() => DossierStepEntity)
@UseGuards(StaffGuard)
export class DossierStepResolver {
  constructor(private readonly dossierStepService: IDossierStepService) {}

  @Query(() => [DossierStepEntity], { name: 'dossierSteps' })
  async fetchAll(): Promise<DossierStep[]> {
    return this.dossierStepService.fetchAll();
  }

  @Query(() => DossierStepEntity, { name: 'dossierStep', nullable: true })
  async fetchOne(@Args('id', { type: () => ID }) id: string): Promise<DossierStep> {
    return this.dossierStepService.fetchOne(id);
  }

  @Mutation(() => DossierStepEntity)
  async createDossierStep(@Args('data') data: CreateDossierStepDTO): Promise<DossierStep> {
    return this.dossierStepService.add(data);
  }

  @Mutation(() => DossierStepEntity)
  async updateDossierStep(@Args('data') data: UpdateDossierStepDTO): Promise<DossierStep> {
    return this.dossierStepService.edit(data);
  }

  @Mutation(() => Boolean)
  async removeDossierStep(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.dossierStepService.remove(id);
  }
}
