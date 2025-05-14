import { Person } from 'domain/interface/person.model';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class ATimestamp {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}

export class PersonAbstract extends ATimestamp implements Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, default: true })
  isActivated?: boolean;
}