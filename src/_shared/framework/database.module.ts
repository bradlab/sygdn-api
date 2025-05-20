import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBRepository } from './database.service';
import { StaffEntity } from './schema/staff.entity';
import { IDBRepository } from 'app/abstract/db.abstract';
import { DomainEntity } from './schema/domain.entity';
import { StepEntity } from './schema/step.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffEntity,
      DomainEntity,
      StepEntity
    ]),
  ],
  providers: [
    {
      provide: IDBRepository,
      useClass: DBRepository,
    },
  ],
  exports: [IDBRepository],
})
export class DBRepositoryModule {}
