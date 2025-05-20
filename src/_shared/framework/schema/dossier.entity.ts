import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ATimestamp } from 'framework/timestamp.abstract';
import { Dossier } from 'domain/model/dossier.model';
import { DomainEntity } from './domain.entity';
import { DossierStepEntity } from './dossier-step.entity';
import { IDomain } from 'domain/model/domain.model';
import { DossierStep } from 'domain/model/dossier-step.model';
import { CommentEntity } from './comment.entity';
import { AffectationEntity } from './affectation.entity';
import { Affectation } from 'domain/model/affectation.model';
import { IComment } from 'domain/model/comment.model';

@ObjectType()
@Entity('dossiers')
export class DossierEntity extends ATimestamp implements Dossier {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  file: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  closedAt?: Date;

  @Field(() => DomainEntity)
  @ManyToOne(() => DomainEntity, domain => domain.dossiers, { eager: true })
  domain: IDomain;

  @Field(() => [DossierStepEntity], { nullable: true })
  @OneToMany(() => DossierStepEntity, step => step.dossier)
  steps?: DossierStep[];

  @Field(() => [CommentEntity], { nullable: true })
  @OneToMany(() => CommentEntity, comment => comment.dossier)
  comments?: IComment[];

  @Field(() => [AffectationEntity], { nullable: true })
  @OneToMany(() => AffectationEntity, affectation => affectation.dossier)
  affectations?: Affectation[];
}
