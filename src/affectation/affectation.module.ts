import { Module } from '@nestjs/common';
import { AffectationService } from './affectation.service';
import { AffectationResolver } from './affectation.resolver';
import { UserModule } from 'user/user.module';
import { IAffectationService } from './affectation.service.interface';

@Module({
  imports: [UserModule],
    providers: [
      { provide: IAffectationService, useClass: AffectationService },
      AffectationResolver,
    ],
    exports: [IAffectationService],
})
export class AffectationModule {}
