import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ICreateTaskDTO, IUpdateTaskDTO } from './task.service.interface';

@InputType()
export class CreateTaskDTO implements ICreateTaskDTO {
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

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  stepId: string;
}

@InputType()
export class UpdateTaskDTO extends PartialType(CreateTaskDTO) implements IUpdateTaskDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
