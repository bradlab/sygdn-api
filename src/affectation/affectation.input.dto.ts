import { InputType, Field, ID, PartialType as GqlPartialType } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ICreateAffectationDTO, IUpdateAffectationDTO } from './affectation.service.interface';

@InputType()
export class CreateAffectationDTO implements ICreateAffectationDTO {
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  report: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  closedAt?: Date;

  @ApiProperty()
  @Field(() => ID, { description: 'Utiliser DossierStep ID' })
  @IsUUID()
  dossierStepId: string;

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  staffId: string;

  @ApiProperty({ required: false })
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  taskId?: string;
}

export class UpdateAffectationDTO extends PartialType(CreateAffectationDTO) implements IUpdateAffectationDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
@InputType()
export class GqlUpdateAffectationDTO extends GqlPartialType(CreateAffectationDTO) implements IUpdateAffectationDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
