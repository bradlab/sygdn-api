import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBRepository } from './database.service';
import { StaffEntity } from './schema/staff.entity';
import { IDBRepository } from 'app/abstract/db.abstract';
import { DomainEntity } from './schema/domain.entity';
import { StepEntity } from './schema/step.entity';
import { DossierStepEntity } from './schema/dossier-step.entity';
import { AffectationEntity } from './schema/affectation.entity';
import { TaskEntity } from './schema/task.entity';
import { CommentEntity } from './schema/comment.entity';
import { DossierEntity } from './schema/dossier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffEntity,
      DomainEntity,
      StepEntity,
      DossierStepEntity,
      DossierEntity,
      CommentEntity,
      TaskEntity,
      AffectationEntity
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
