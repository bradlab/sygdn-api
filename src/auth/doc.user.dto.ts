import { ApiProperty } from '@nestjs/swagger';
import { BasicPersonnalInfoDTO } from 'adapter/param.dto';
import { RoleEnum } from 'app/enum';
import { Staff } from 'domain/model/staff.model';

export class DocUserDTO extends BasicPersonnalInfoDTO implements Partial<Staff> {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Boolean, enum: RoleEnum })
  role: RoleEnum;

  @ApiProperty({ type: Boolean })
  isActivated: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  otpCode?: string;
}

export class DocSignedUserDTO extends DocUserDTO {
  @ApiProperty({ type: String })
  accessToken: string;
}
