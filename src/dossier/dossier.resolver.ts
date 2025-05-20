import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Dossier } from 'domain/model/dossier.model';
import { CreateDossierDTO, UpdateDossierDTO } from './dossier.input.dto';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { IDossierService } from './dossier.service.interface';

@ApiTags('Dossier management')
@ApiBearerAuth()
@Resolver(() => Dossier)
@UseGuards(StaffGuard)
export class DossierResolver {
  constructor(private readonly dossierService: IDossierService) {}

  @Query(() => [Dossier], { name: 'dossiers' })
  async fetchAll(): Promise<Dossier[]> {
    return this.dossierService.fetchAll();
  }

  @Query(() => Dossier, { name: 'dossier', nullable: true })
  async fetchOne(@Args('id', { type: () => ID }) id: string): Promise<Dossier> {
    return this.dossierService.fetchOne(id);
  }

  @Mutation(() => Dossier)
  async createDossier(@Args('data') data: CreateDossierDTO): Promise<Dossier> {
    return this.dossierService.add(data);
  }

  @Mutation(() => Dossier)
  async updateDossier(@Args('data') data: UpdateDossierDTO): Promise<Dossier> {
    return this.dossierService.edit(data);
  }

  @Mutation(() => Boolean)
  async removeDossier(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.dossierService.remove(id);
  }
}
