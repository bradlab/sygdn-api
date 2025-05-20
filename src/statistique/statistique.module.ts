import { Module } from '@nestjs/common';
import { StatistiqueController } from './statistique.controller';
import { StatistiqueService } from './statistique.service';
import { IStatistiqueService } from './statistique.service.interface';
import { UserModule } from 'user/user.module';

@Module({
    imports: [UserModule],
controllers: [StatistiqueController],
  providers: [{provide: IStatistiqueService, useClass: StatistiqueService}],
  exports: [StatistiqueService],
})
export class StatistiqueModule {}
