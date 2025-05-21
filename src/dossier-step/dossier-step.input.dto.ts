import { InputType, Field, ID, PartialType as GqlPartialType } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ICreateDossierStepDTO, IUpdateDossierStepDTO } from './dossier-step.service.interface';
import { StepStatusEnum } from 'app/enum';

@InputType()
export class CreateDossierStepDTO implements ICreateDossierStepDTO {
  @ApiProperty()
  @Field()
  // @Field(() => GraphQLISODateTime)
  @IsDateString()
  startDate: Date;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  // @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({ required: false, enum: StepStatusEnum })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEnum(StepStatusEnum)
  status: StepStatusEnum;

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  dossierId: string;

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  stepId: string;
}

export class UpdateDossierStepDTO extends PartialType(CreateDossierStepDTO) implements IUpdateDossierStepDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
@InputType()
export class GqlUpdateDossierStepDTO extends GqlPartialType(CreateDossierStepDTO) implements IUpdateDossierStepDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
