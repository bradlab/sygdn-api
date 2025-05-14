import { DataHelper } from "adapter/helper/data.helper";
import { Staff } from "domain/model/staff.model";


export abstract class UserFactory {
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
}
