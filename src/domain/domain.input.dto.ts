import { InputType, Field, ID, PartialType as GqlPartialType } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateDomainDTO {
  @ApiProperty({ example: 'Nom du domaine' })
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Description du domaine', required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateDomainDTO extends PartialType(CreateDomainDTO) {
  @ApiProperty({ example: 'uuid-du-domaine', description: 'ID du domaine' })
  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  id: string;
}

@InputType()
export class GqlUpdateDomainDTO extends GqlPartialType(CreateDomainDTO) {
  @ApiProperty({ example: 'uuid-du-domaine', description: 'ID du domaine' })
  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  id: string;
}
