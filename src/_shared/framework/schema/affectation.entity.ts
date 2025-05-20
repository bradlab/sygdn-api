import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ATimestamp } from 'framework/timestamp.abstract';
import { Affectation as IAffectation } from 'domain/model/affectation.model';
import { DossierEntity } from './dossier.entity';
import { StaffEntity } from './staff.entity';
import { TaskEntity } from './task.entity';
import { Dossier } from 'domain/model/dossier.model';
import { Staff } from 'domain/model/staff.model';
import { ITask } from 'domain/model/task.model';

@ObjectType()
@Entity('affectations')
export class AffectationEntity extends ATimestamp implements IAffectation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  report: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  closedAt?: Date;

  @Field(() => DossierEntity)
  @ManyToOne(() => DossierEntity, dossier => dossier.affectations, { eager: true })
  dossier: Dossier;

  @Field(() => StaffEntity)
  @ManyToOne(() => StaffEntity, staff => staff.affectations, { eager: true })
  staff: Staff;

  @Field(() => TaskEntity, { nullable: true })
  @ManyToOne(() => TaskEntity, { nullable: true })
  Task: ITask;
}
