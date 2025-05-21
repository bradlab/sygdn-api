import { Module } from '@nestjs/common';
import { IDomainService } from './domain.service.interface';
import { DomainService } from './domain.service';
import { DomainResolver } from './domain.resolver';
import { UserModule } from 'user/user.module';
import { DomainController } from './domain.controller';

@Module({
  imports: [UserModule],
  controllers: [DomainController],
  providers: [DomainResolver, { provide: IDomainService, useClass: DomainService }],
  exports: [IDomainService],
})
export class DomainModule {}
