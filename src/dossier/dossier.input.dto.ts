import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ICreateDossierDTO, IUpdateDossierDTO } from './dossier.service.interface';

@InputType()
export class CreateDossierDTO implements ICreateDossierDTO {
  @ApiProperty()
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Field()
  @IsString()
  @IsNotEmpty()
  file: string;

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  domainId: string;
}

@InputType()
export class UpdateDossierDTO extends PartialType(CreateDossierDTO) implements IUpdateDossierDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  closedAt?: Date;
}
