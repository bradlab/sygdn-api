import { Module } from '@nestjs/common';
import { DossierStepService } from './dossier-step.service';
import { DossierStepResolver } from './dossier-step.resolver';
import { UserModule } from 'user/user.module';
import { IDossierStepService } from './dossier-step.service.interface';

@Module({
  imports: [UserModule],
    providers: [
      { provide: IDossierStepService, useClass: DossierStepService },
      DossierStepResolver,
    ],
    exports: [IDossierStepService],
})
export class DossierStepModule {}
