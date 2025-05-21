import { InputType, Field, ID, PartialType as GqlPartialType } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';
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

export class UpdateCommentDTO extends PartialType(CreateCommentDTO) implements IUpdateCommentDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
@InputType()
export class GqlUpdateCommentDTO extends GqlPartialType(CreateCommentDTO) implements IUpdateCommentDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;
}
