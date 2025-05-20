import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ICreateCommentDTO, IUpdateCommentDTO } from './comment.service.interface';

@InputType()
export class CreateCommentDTO implements ICreateCommentDTO {
  @ApiProperty()
  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  dossierId: string;

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  staffId: string;
}

@InputType()
export class UpdateCommentDTO extends PartialType(CreateCommentDTO) implements IUpdateCommentDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
