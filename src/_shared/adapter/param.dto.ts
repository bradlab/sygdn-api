import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MaritalStatusEnum, SexEnum } from 'app/enum';
import {
  IIDParamDTO,
  IIDsParamDTO,
  IPhoneParamDTO,
} from 'app/param.input.dto';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Person } from '../domain/interface/person.model';

export class IDParamDTO implements IIDParamDTO {
  @IsUUID()
  id: string;
}

export class IDsBodyDTO implements IIDsParamDTO {
  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Liste des ID du modele concerné',
    required: false,
  })
  @IsString({ each: true })
  @IsUUID(undefined, { each: true })
  ids: string[];
}

export class IDsParamDTO extends PartialType(IDsBodyDTO) {}

export class PhoneParamDTO implements IPhoneParamDTO {
  @IsPhoneNumber()
  phone: string;
}

export class DateFilterDTO {
  @ApiProperty({
    type: Date,
    description: 'La date de début pour le filtrage',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  from?: Date;

  @ApiProperty({
    type: Date,
    description: 'La date de fin  pour le filtrage',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  to?: Date;

  @ApiProperty({
    type: Date,
    description:
      'La date de filtrage si le filtrage se fera pour une date spécifique',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: Date;
}

export class BasicPersonnalInfoDTO implements Partial<Person> {
  @ApiProperty({
    type: String,
    description: 'Le nom de la personne',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description:
      "Le numéro de téléphone sur lequel contacter l'utilisateur du compte ou envoyer des informations OTP",
  })
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ type: String, enum: SexEnum, name: 'sex', required: false })
  @IsOptional()
  @IsEnum(SexEnum)
  sex?: SexEnum;

  @ApiProperty({
    type: String,
    description:
      "L'adresse e-mail sur laquelle partagent certaines informations avec l'utilisateur par notification",
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    description: 'Adresse complète de la personne',
    required: false,
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    description: 'Pays de résidence de la personne',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    type: String,
    enum: MaritalStatusEnum,
    description: 'Statut matrimonial de la personne',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(MaritalStatusEnum)
  maritalStatus?: MaritalStatusEnum;
}
