import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ATimestamp } from 'framework/timestamp.abstract';
import { DossierStep } from 'domain/model/dossier-step.model';
import { StepEntity } from './step.entity';
import { Step } from 'domain/model/step.model';
import { Dossier } from 'domain/model/dossier.model';
import { ITask } from 'domain/model/task.model';
import { TaskEntity } from './task.entity';
import { DossierEntity } from './dossier.entity';
import { StepStatusEnum } from 'app/enum';

@ObjectType()
@Entity('dossier_steps')
export class DossierStepEntity extends ATimestamp implements DossierStep {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  startDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endDate?: Date;

  @Field()
  @Column({enum: StepStatusEnum, default: StepStatusEnum.PENDING})
  status: StepStatusEnum;

  @Field(() => DossierEntity)
  @ManyToOne(() => DossierEntity, dossier => dossier.steps, { eager: true })
  dossier: Dossier;

  @Field(() => StepEntity)
  @ManyToOne(() => StepEntity, { eager: true })
  step: Step;

  @Field(() => [TaskEntity], { nullable: true })
  @OneToMany(() => TaskEntity, task => task.step)
  tasks?: ITask[];
}
