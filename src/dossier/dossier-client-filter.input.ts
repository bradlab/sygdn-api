import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { StepStatusEnum } from 'app/enum';
import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';

@InputType()
export class DossierClientFilterDTO {
  @ApiProperty({ description: 'ID du client' })
  @Field(() => ID)
  @IsUUID()
  clientId: string;

  @ApiProperty({ description: 'ID du juriste pour filtrer les commentaires', required: false })
  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  staffId?: string;

  @ApiProperty({ description: 'Filtrer par statut du dossier', required: false })
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  status?: StepStatusEnum;

  @ApiProperty({ description: 'Page courante', required: false })
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  page?: number;

  @ApiProperty({ description: 'Taille de la page', required: false })
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  pageSize?: number;
}
