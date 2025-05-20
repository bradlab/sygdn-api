import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ATimestamp } from 'framework/timestamp.abstract';
import { ITask } from 'domain/model/task.model';
import { Step } from 'domain/model/step.model';
import { StepEntity } from './step.entity';

@ObjectType()
@Entity('tasks')
export class TaskEntity extends ATimestamp implements ITask {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;
  
  @Field(() => StepEntity)
  @ManyToOne(() => StepEntity, step => step.tasks, { eager: true })
  step: Step;
}
