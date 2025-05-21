import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DBGenericRepository } from 'framework/database.repository';
import { Repository } from 'typeorm';
import { StaffEntity } from './schema/staff.entity';
import { IDBRepository } from 'app/abstract/db.abstract';
import { DomainEntity } from './schema/domain.entity';
import { StepEntity } from './schema/step.entity';
import { IGenericRepository } from 'domain/abstract';
import { Affectation } from 'domain/model/affectation.model';
import { IComment } from 'domain/model/comment.model';
import { DossierStep } from 'domain/model/dossier-step.model';
import { Dossier } from 'domain/model/dossier.model';
import { ITask } from 'domain/model/task.model';
import { CommentEntity } from './schema/comment.entity';
import { TaskEntity } from './schema/task.entity';
import { AffectationEntity } from './schema/affectation.entity';
import { DossierStepEntity } from './schema/dossier-step.entity';
import { DossierEntity } from './schema/dossier.entity';

@Injectable()
export class DBRepository implements IDBRepository, OnApplicationBootstrap {
  users: DBGenericRepository<StaffEntity>;
  domains: DBGenericRepository<DomainEntity>;
  steps: DBGenericRepository<StepEntity>;

  dossiers: IGenericRepository<DossierEntity>;
  comments: IGenericRepository<CommentEntity>;
  tasks: IGenericRepository<TaskEntity>;
  dossierSteps: IGenericRepository<DossierStepEntity>;
  affectations: IGenericRepository<AffectationEntity>;

  constructor(
    @InjectRepository(StaffEntity)
    private userRepository: Repository<StaffEntity>,

    @InjectRepository(DomainEntity)
    private domainRepository: Repository<DomainEntity>,

    @InjectRepository(StepEntity)
    private stepRepository: Repository<StepEntity>,

    @InjectRepository(DossierEntity)
    private dossierRepository: Repository<DossierEntity>,

    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,

    @InjectRepository(TaskEntity)
    private taskRepository: Repository<ITask>,

    @InjectRepository(DossierStepEntity)
    private dossierStepRepository: Repository<DossierStepEntity>,

    @InjectRepository(AffectationEntity)
    private affectationRepository: Repository<AffectationEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.users = new DBGenericRepository<StaffEntity>(this.userRepository);
    this.domains = new DBGenericRepository<DomainEntity>(this.domainRepository);
    this.steps = new DBGenericRepository<StepEntity>(this.stepRepository);
    this.dossiers = new DBGenericRepository<DossierEntity>(this.dossierRepository);
    this.comments = new DBGenericRepository<CommentEntity>(this.commentRepository);
    this.tasks = new DBGenericRepository<TaskEntity>(this.taskRepository);
    this.dossierSteps = new DBGenericRepository<DossierStepEntity>(this.dossierStepRepository);
    this.affectations = new DBGenericRepository<AffectationEntity>(this.affectationRepository);
  }
}