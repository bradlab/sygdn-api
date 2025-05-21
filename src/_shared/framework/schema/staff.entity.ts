import { Exclude } from 'class-transformer';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { PersonAbstract } from 'framework/timestamp.abstract';
import { MaritalStatusEnum, RoleEnum, SexEnum } from 'app/enum';
import { Staff } from 'domain/model/staff.model';
import { Affectation } from 'domain/model/affectation.model';
import { IComment } from 'domain/model/comment.model';
import { AffectationEntity } from './affectation.entity';
import { CommentEntity } from './comment.entity';
@ObjectType()
@Entity('staff')
@Index(['phone'], { unique: true, where: `deleted_at IS NULL` })
@Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class StaffEntity extends PersonAbstract implements Staff {
  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, enum: SexEnum })
  sex?: SexEnum;

  @Exclude()
  @Column()
  password: string;

  @Field()
  @Column({ nullable: true, default: RoleEnum.COLLEAGUE })
  role: RoleEnum;

  @Field()
  @Column({ nullable: true, default: MaritalStatusEnum.SINGLE })
  maritalStatus?: MaritalStatusEnum;

  @Field(() => [AffectationEntity], { nullable: true })
  @OneToMany(() => AffectationEntity, (affectation) => affectation.staff)
  affectations?: Affectation[];

  @Field(() => [CommentEntity], { nullable: true })
  @OneToMany(() => CommentEntity, (comment) => comment.staff)
  comments?: IComment[];
}
