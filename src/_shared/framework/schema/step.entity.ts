import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { ATimestamp } from 'framework/timestamp.abstract';
import { Step } from 'domain/model/step.model';
import { DomainEntity } from 'framework/schema/domain.entity';
import { TaskEntity } from './task.entity';
import { ITask } from 'domain/model/task.model';

@ObjectType()
@Entity('steps')
export class StepEntity extends ATimestamp implements Step {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => Float)
  @Column()
  duration: number;

  @Field(() => Int)
  @Column('int')
  order: number;

  @Field(() => DomainEntity)
  @ManyToOne(() => DomainEntity, { eager: true, nullable: false })
  domain: DomainEntity;

  @Field(() => [TaskEntity], { nullable: true })
  @OneToMany(() => TaskEntity, Task => Task.step)
  tasks?: ITask[];
}
