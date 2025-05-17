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
    name: 'ids',
    isArray: true,
    description: 'Liste des ID du modele concerné',
    required: false,
  })
  @IsString({ each: true })
  @IsUUID(undefined, { each: true })
  ids?: string[];
}

export class IDsParamDTO extends PartialType(IDsBodyDTO) {}

export class PhoneParamDTO implements IPhoneParamDTO {
  @IsPhoneNumber()
  phone: string;
}

export class DateFilterDTO {
  @ApiProperty({
    type: Date,
    name: 'from',
    description: 'La date de début pour le filtrage',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  from?: Date;

  @ApiProperty({
    type: Date,
    name: 'to',
    description: 'La date de fin  pour le filtrage',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  to?: Date;

  @ApiProperty({
    type: Date,
    name: 'date',
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
    name: 'lastname',
    description: 'Le ou les prénom(s) de la personne',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    type: String,
    name: 'firstname',
    description: 'Le nom de la personne',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    name: 'phone',
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
    name: 'email',
    description:
      "L'adresse e-mail sur laquelle partagent certaines informations avec l'utilisateur par notification",
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    name: 'address',
    description: 'Adresse complète de la personne',
    required: false,
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    name: 'country',
    description: 'Pays de résidence de la personne',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    type: String,
    name: 'maritalStatus',
    enum: MaritalStatusEnum,
    description: 'Statut matrimonial de la personne',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(MaritalStatusEnum)
  maritalStatus?: MaritalStatusEnum;
}
