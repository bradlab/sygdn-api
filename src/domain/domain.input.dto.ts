import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateDomainDTO {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsOptional()
  @IsString()
  description: string;
}

@InputType()
export class UpdateDomainDTO extends PartialType(CreateDomainDTO) {
    @Field({ nullable: true })
    @IsString()
    @IsUUID()
    id: string;
}
