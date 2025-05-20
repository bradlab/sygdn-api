import { Module } from '@nestjs/common';
import { DossierService } from './dossier.service';
import { DossierResolver } from './dossier.resolver';
import { IDossierService } from './dossier.service.interface';
import { UserModule } from 'user/user.module';
import { DossierController } from './dossier.controller';

@Module({
  imports: [UserModule],
  controllers: [DossierController],
  providers: [
    { provide: IDossierService, useClass: DossierService },
    DossierResolver,
  ],
  exports: [IDossierService],
})
export class DossierModule {}
