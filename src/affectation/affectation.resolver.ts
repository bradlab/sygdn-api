import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Affectation } from 'domain/model/affectation.model';
import { IAffectationService } from './affectation.service.interface';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { GetUser } from 'adapter/decorator';
import { Staff } from 'domain/model/staff.model';
import { CreateAffectationDTO, UpdateAffectationDTO } from './affectation.input.dto';

@ApiTags('Dossier Affectations')
@ApiBearerAuth()
@Resolver(() => Affectation)
@UseGuards(StaffGuard)
export class AffectationResolver {
  constructor(private readonly affectationService: IAffectationService) {}

  @Query(() => [Affectation], { name: 'affectations' })
  async fetchAll(): Promise<Affectation[]> {
    return this.affectationService.fetchAll();
  }

  @Query(() => Affectation, { name: 'affectation', nullable: true })
  async fetchOne(@Args('id', { type: () => ID }) id: string): Promise<Affectation> {
    return this.affectationService.fetchOne(id);
  }

  @Mutation(() => Affectation)
  async createAffectation(@GetUser() user: Staff, @Args('data') data: CreateAffectationDTO): Promise<Affectation> {
    return this.affectationService.add(user, data);
  }

  @Mutation(() => Affectation)
  async updateAffectation(@Args('data') data: UpdateAffectationDTO): Promise<Affectation> {
    return this.affectationService.edit(data);
  }

  @Mutation(() => Boolean)
  async removeAffectation(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.affectationService.remove(id);
  }
}
