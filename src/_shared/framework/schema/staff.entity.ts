import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
} from 'typeorm';
import { PersonAbstract } from 'framework/timestamp.abstract';
import { MaritalStatusEnum, RoleEnum, SexEnum } from 'app/enum';
import { Staff } from 'domain/model/staff.model';

@Entity('staff')
@Index(['phone'], { unique: true, where: `deleted_at IS NULL` })
@Index(['email'], { unique: true, where: `deleted_at IS NULL` })
export class StaffEntity extends PersonAbstract implements Staff {
  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true, enum: SexEnum })
  sex?: SexEnum;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true, default: RoleEnum.COLLEAGUE })
  role: RoleEnum;

  @Column({ nullable: true, default: MaritalStatusEnum.SINGLE })
  maritalStatus?: MaritalStatusEnum;
}
