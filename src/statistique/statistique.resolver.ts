import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { IStatistiqueService } from './statistique.service.interface';
import { StatistiqueQueryDto } from './statistique.query.dto';
import { GqlAuthGuard } from 'adapter/guard/auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver('Statistiques')
export class StatistiqueResolver {
  constructor(private readonly stats: IStatistiqueService) {}

  @Query(() => [Object], { name: 'dossiersPerMonth' })
  async dossiersPerMonth(@Args() query: StatistiqueQueryDto) {
    return this.stats.dossiersPerMonth(query);
  }

  @Query(() => [Object], { name: 'dossiersStatusDistribution' })
  async dossiersStatusDistribution(@Args() query: StatistiqueQueryDto) {
    return this.stats.dossiersStatusDistribution(query);
  }

  @Query(() => Object, { name: 'averageDossierProcessingTime' })
  async averageDossierProcessingTime(@Args() query: StatistiqueQueryDto) {
    return this.stats.averageDossierProcessingTime(query);
  }

  @Query(() => [Object], { name: 'lateTasksByStaff' })
  async lateTasksByStaff(@Args() query: StatistiqueQueryDto) {
    return this.stats.lateTasksByStaff(query);
  }

  @Query(() => [Object], { name: 'topDossiersByComments' })
  async topDossiersByComments(@Args() query: StatistiqueQueryDto) {
    return this.stats.topDossiersByComments(query);
  }
}
