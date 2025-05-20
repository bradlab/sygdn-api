import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IStatisticQueryDTO } from './statistique.service.interface';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { StepStatusEnum } from 'app/enum';

@InputType()
export class StatistiqueQueryDto implements IStatisticQueryDTO {
  @ApiProperty({
    required: false,
    description: 'Année pour la statistique (ex: 2025)',
  })
  @Field()
  @IsNumber()
  year?: number;

  @ApiProperty({
    required: false,
    description: 'Statut du dossier (ex: ouvert, clos, en_attente)',
  })
  @Field()
  @IsString()
  @IsEnum(StepStatusEnum)
  status?: StepStatusEnum;

  @ApiProperty({
    required: false,
    description: 'ID du staff pour filtrer les tâches',
  })
  @Field(() => ID)
  @IsString()
  @IsUUID()
  staffId?: string;

  @ApiProperty({ required: false, description: 'ID du dossier' })
  @Field(() => ID)
  @IsString()
  @IsUUID()
  dossierId?: string;

  @ApiProperty({ required: false, description: 'Limite pour les tops (ex: 5)' })
  @Field()
  @IsNumber()
  limit?: number;
}
