import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CreateDomainDTO, UpdateDomainDTO } from './domain.input.dto';
import { DomainEntity } from 'framework/schema/domain.entity';
import { ODomain } from 'domain/model/domain.model';
import { DomainFactory } from 'adapter/factory/domain.factory';
import { IDomainService } from './domain.service.interface';

@Resolver(() => DomainEntity)
export class DomainResolver {
  constructor(private readonly domainService: IDomainService) {} // Injection de dépendance du service Domain

  @Query(() => [DomainEntity], { name: 'domains' })
  async fetchAll(): Promise<DomainEntity[]> {
    return this.domainService.fetchAll();
  }

  @Query(() => DomainEntity, { name: 'domain', nullable: true }) // Nomme la Query 'domain', peut retourner null
  async fetchOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<DomainEntity | undefined> {
    return this.domainService.fetchOne(id);
  }

  @Mutation(() => DomainEntity)
  async createDomain(
    @Args('createDomainData') data: CreateDomainDTO,
  ): Promise<ODomain> {
    return DomainFactory.getDomain(await this.domainService.add(data));
  }

  @Mutation(() => DomainEntity, { nullable: true })
  async updateDomain(
    @Args('updateDomainData') data: UpdateDomainDTO, // Argument Input Type pour les données de mise à jour
  ): Promise<DomainEntity | undefined> {
    return this.domainService.edit(data);
  }

  @Mutation(() => Boolean)
  async removeDomain(
    @Args('ids', { type: () => [ID] }) ids: string[],
  ): Promise<boolean> {
    return this.domainService.remove(ids);
  }
}
