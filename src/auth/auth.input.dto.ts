import { ApiProperty } from '@nestjs/swagger';
import { BasicPersonnalInfoDTO } from 'adapter/param.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdatePwdDTO {
  @ApiProperty({
    type: String,
    description: 'The old password of the user',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: String})
  @IsString()
  newPassword: string;
}
export class SigninAccoutDTO {
  @ApiProperty({
    type: String,
    description: 'The email address if the plateform use it for login',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    description: 'The phone number if the plateform use it for login',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ type: String, name: 'password' })
  @IsString()
  password: string;
}

export class ForgotPasswordDTO {
  @ApiProperty({
    type: String,
    description: 'The email address if the plateform use it for login',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    description: 'The phone number if the plateform use it for login',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}

export class ResetPasswordDTO extends SigninAccoutDTO {
  @ApiProperty({
    type: String,
    description: 'The otp validation code for reseting',
  })
  @IsOptional() // TODO: this is required
  @IsNotEmpty()
  otpCode: string;
}

export class RegisterStaffDTO extends BasicPersonnalInfoDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  avatar: string;
}
