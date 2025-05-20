import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ATimestamp } from 'framework/timestamp.abstract';
import { IComment } from 'domain/model/comment.model';
import { DossierEntity } from './dossier.entity';
import { StaffEntity } from './staff.entity';
import { Dossier } from 'domain/model/dossier.model';
import { Staff } from 'domain/model/staff.model';

@ObjectType()
@Entity('comments')
export class CommentEntity extends ATimestamp implements IComment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  content: string;

  @Field(() => DossierEntity)
  @ManyToOne(() => DossierEntity, dossier => dossier.comments, { eager: true })
  dossier: Dossier;

  @Field(() => StaffEntity)
  @ManyToOne(() => StaffEntity, staff => staff.comments, { eager: true })
  staff: Staff;
}
