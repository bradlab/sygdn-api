import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ICreateAffectationDTO, IUpdateAffectationDTO } from './affectation.service.interface';

@InputType()
export class CreateAffectationDTO implements ICreateAffectationDTO {
  @ApiProperty()
  @Field()
  @IsString()
  @IsNotEmpty()
  report: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  closedAt?: Date;

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  dossierId: string;

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

@InputType()
export class UpdateAffectationDTO extends PartialType(CreateAffectationDTO) implements IUpdateAffectationDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
