import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { ATimestamp } from 'framework/timestamp.abstract';
import { IDomain } from 'domain/model/domain.model';

@ObjectType() // Déclare que cette classe est un type objet GraphQL
@Entity('domains')
export class DomainEntity extends ATimestamp implements IDomain {
  @PrimaryColumn() // Déclare ce champ en GraphQL
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field() // Déclare ce champ en GraphQL
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ nullable: true, default: true })
  isActivated: boolean;
}
