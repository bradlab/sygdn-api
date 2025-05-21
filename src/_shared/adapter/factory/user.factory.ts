import { HashFactory } from "adapter/hash.factory";
import { DataHelper } from "adapter/helper/data.helper";
import { Staff } from "domain/model/staff.model";
import { ICreateUserDTO, IUpdateUserDTO } from "user/user.service.interface";


export abstract class StaffFactory {
  static getUser(user: Staff): Partial<Staff> {
    if (user) {
      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        degree: user.degree,
        address: user.address,
        role: user.role,
        avatar: user.avatar ? DataHelper.getFileLink(user.avatar) : undefined,
        isActivated: user.isActivated,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }
    return null as unknown as Staff;
  }
    static async create(data: ICreateUserDTO): Promise<Staff> {
    const user = new Staff();
    user.email = data.email;
    user.phone = data.phone;
    user.role = data.role;
    user.degree = data.degree;
    user.sex = data.sex;
    user.maritalStatus = data.maritalStatus;
    user.name = data.name;
    user.address = data.address;
    user.password = await HashFactory.hashPwd(data.password);

    return user;
  }

  static update(user: Staff, data: IUpdateUserDTO): Staff {
    user.email = data.email ?? user.email;
    user.phone = data.phone ?? user.phone;
    user.maritalStatus = data.maritalStatus ?? user.maritalStatus;
    user.name = data.name ?? user.name;
    user.degree = data.degree ?? user.degree;
    user.address = data.address ?? user.address;
    user.role = data.role ?? user.role;

    return user;
  }
}
