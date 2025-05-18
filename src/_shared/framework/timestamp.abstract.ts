import { Person } from 'domain/interface/person.model';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, } from '@nestjs/graphql';


@ObjectType({ isAbstract: true })
export abstract class ATimestamp {
  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ name: 'deleted_at' }) // Nom de la colonne dans la base de données
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