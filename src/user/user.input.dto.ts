import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BasicPersonnalInfoDTO } from 'adapter/param.dto';
import { RoleEnum } from 'app/enum';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserAccoutDTO extends BasicPersonnalInfoDTO {
  @ApiProperty({ type: String, format: 'binary', required: false })
  avatar?: string;

  @ApiProperty({
    type: String,
    enum: RoleEnum,
    description: 'The role of the user',
  })
  @IsString()
  @IsEnum(RoleEnum)
  role: RoleEnum;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  degree: string;
}

export class RegisterUserDTO extends UserAccoutDTO {
  @ApiProperty({
    type: String,
  })
  @IsString()
  password: string;
}

export class UpdateUserDTO extends PartialType(UserAccoutDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID of the given user',
  })
  @IsString()
  @IsUUID()
  id: string;
}

export class UserQueryDTO extends PartialType(UserAccoutDTO) {
  @ApiProperty({
    type: String,
    description: 'ID of the given user',
    required: false
  })
  @IsOptional()
  @IsString({each: true})
  @IsUUID(undefined, {each: true})
  ids?: string[];
}