import {
  Logger,
  Injectable,
  ConflictException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';

import { DataHelper } from 'adapter/helper/data.helper';
import { IAuthService, IUserQuery } from 'auth/auth.service.interface';
import { Staff } from 'domain/model/staff.model';
import { DeepQueryType } from 'domain/types';
import { VIn, VNot } from 'framework/orm.clauses';
import { IUserService, IUpdateUserDTO, ICreateUserDTO } from './user.service.interface';
import { IDBRepository } from 'app/abstract/db.abstract';
import { StaffFactory } from 'adapter/factory/user.factory';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger();
  constructor(
    private authService: IAuthService,
    private dbRepository: IDBRepository,
  ) {}

  async add(data: ICreateUserDTO): Promise<Staff> {
    try {
      const { email, phone } = data;
      let existed: Staff = new Staff();
      if (email) existed = await this.authService.search({ email });
      if (phone) existed = await this.authService.search({ phone });
      if (existed) {
        throw new ConflictException(
          'Employee account email or phone number allready exist',
        );
      }
      return await this.dbRepository.users.create(
        await StaffFactory.create({
          ...data,
        }),
      );
    } catch (error) {
      this.logger.error(error, 'ERROR::UserService.add');
      throw error;
    }
  }

  async fetchAll(param?: IUserQuery): Promise<Staff[]> {
    if (param && !DataHelper.isEmpty(param)) {
      let queryParam: DeepQueryType<Staff> | DeepQueryType<Staff>[] = {};
      const { ids, ...rest } = param;

      if (ids) {
        if (typeof ids === 'string') {
          param.ids = [ids];
        }
        queryParam = { ...queryParam, id: VIn(param.ids!) };
      }
      if (rest) {
        queryParam = { ...queryParam, ...rest };
      }
      if (!DataHelper.isEmpty(queryParam)) {
        return await this.dbRepository.users.find({
          where: { ...queryParam },
          order: { createdAt: 'DESC' },
        });
      }
      return [];
    }
    return await this.dbRepository.users.find({
      order: { createdAt: 'DESC' },
    });
  }

  async search(data: Partial<Staff>): Promise<Staff> {
    try {
      return await this.authService.search(data);
    } catch (error) {
      this.logger.error(error, 'ERROR::UserService.search');
      return null as unknown as Staff;
    }
  }

  async fetchOne(id: string): Promise<Staff> {
    return await this.dbRepository.users.findOneByID(id);
  }

  async edit(data: IUpdateUserDTO): Promise<Staff> {
    try {
      const { id, phone } = data;
      const user = await this.fetchOne(id);
      if (user) {
        const existedUser = await this.dbRepository.users.findOne({
          where: { phone, id: VNot(user.id) },
        });
        if (existedUser)
          throw new ConflictException('Phone number allready exist');
        
        const userInstance = StaffFactory.update(user, data);
        return await this.dbRepository.users.update(userInstance);
      }
      throw new NotFoundException('Staff not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.editUser');

      throw error;
    }
  }

  async setState(ids: string[]): Promise<boolean> {
    try {
      const users = ids && (await this.dbRepository.users.findByIds(ids));
      if (users?.length > 0) {
        users.map((user) => {
          user.isActivated = !user.isActivated;
          return user;
        });
        return await this.dbRepository.users.updateMany(users).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error, 'ERROR::UserService.setState');
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const user = await this.fetchOne(id);
      if (user) {
        return await this.dbRepository.users.remove(user).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.remove');
      throw error;
    }
  }
  async clean(): Promise<boolean> {
    try {
      throw new NotImplementedException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::UserService.remove');
      throw error;
    }
  }
}
