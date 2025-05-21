import { InputType, Field, ID, PartialType as GqlPartialType } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ICreateDossierDTO, IUpdateDossierDTO } from './dossier.service.interface';

@InputType()
export class CreateDossierDTO implements ICreateDossierDTO {
  @ApiProperty()
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  // file: string;
  @ApiProperty({format: 'binary', required: false})
  @Field({ nullable: true })
  // @Field(() => GraphQLUpload)
  file: string; 

  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  domainId: string;
}

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
@InputType()
export class GqlUpdateDossierDTO extends GqlPartialType(CreateDossierDTO) implements IUpdateDossierDTO {
  @ApiProperty()
  @Field(() => ID)
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  closedAt?: Date;
}
