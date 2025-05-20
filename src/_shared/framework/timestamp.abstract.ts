import { Person } from 'domain/interface/person.model';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID, } from '@nestjs/graphql';


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
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  address: string;

  @Field()
  @Column({ nullable: true, default: true })
  isActivated?: boolean;
}