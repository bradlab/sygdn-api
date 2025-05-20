import { InputType, Field, Int, ID, PartialType } from '@nestjs/graphql';
import { ApiProperty  } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber, Min } from 'class-validator';
import { ICreateStepDTO } from './step.service.interface';

@InputType()
export class CreateStepDTO implements ICreateStepDTO {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 5, description: 'Durée en jours' })
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  duration: number;

  @ApiProperty({ example: 1, description: "Ordre d'exécution" })
  @Field(() => Int)
  @IsNumber()
  order: number;

  @ApiProperty({ description: 'ID du domaine' })
  @Field(() => ID)
  @IsUUID()
  domainId: string;
}

@InputType()
export class UpdateStepDTO extends PartialType(CreateStepDTO) {
  @ApiProperty({ description: 'ID du step' })
  @Field(() => ID)
  @IsUUID()
  id: string;
}
