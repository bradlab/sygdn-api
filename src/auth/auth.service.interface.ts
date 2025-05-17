import { RoleEnum } from "app/enum";
import { ISigninAccoutDTO, IUpdatePwdDTO, IForgotPasswordDTO } from "domain/interface";
import { Staff } from "domain/model/staff.model";

export interface ISignedUserDTO {
  user: Staff;
  deviceToken?: string;
  accessToken: string;
}
export interface ISignedUserDTO {
  accessToken: string;
}
export interface IUserQuery {
  ids?: string[];
  email?: string;
  degree?: string;
  role?: RoleEnum;
  phone?: string;
}

export interface IResetPasswordDTO extends ISigninAccoutDTO {
  otpCode: string;
}

export interface SignedUser extends Partial<Staff> {
  accessToken: string;
}

export abstract class IAuthService {
  abstract signin(data: ISigninAccoutDTO): Promise<ISignedUserDTO>;

  abstract checkEmail(email: string): Promise<boolean>;

  abstract checkPhone(phone: string): Promise<boolean>;

  abstract updatePassword(user: Staff, data: IUpdatePwdDTO): Promise<boolean>;

  abstract forgotPassword(data: IForgotPasswordDTO): Promise<string>;

  abstract resetPassword(data: IResetPasswordDTO): Promise<boolean>;

  abstract search(data: Partial<Staff>): Promise<Staff>;
}
