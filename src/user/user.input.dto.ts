import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BasicPersonnalInfoDTO } from 'adapter/param.dto';
import { RoleEnum } from 'app/enum';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserAccoutDTO extends BasicPersonnalInfoDTO {
  @ApiProperty({ type: String, format: 'binary', required: false })
  avatar?: string;

  @ApiProperty({
    type: String,
    enum: RoleEnum,
    description: 'The role of the user',
  })
  @IsString()
  @IsEnum({enum: RoleEnum})
  role: RoleEnum;
  
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  degree: string;
}

export class RegisterUserDTO extends UserAccoutDTO {
  @ApiProperty({
    type: String,
    name: 'password',
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
  })
  @IsString({each: true})
  @IsUUID(undefined, {each: true})
  ids?: string[];
}