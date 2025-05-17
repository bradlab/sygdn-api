import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { RoleEnum } from 'app/enum';
import { DataGenerator } from 'domain/generator/data.generator';
import { ICreateUserDTO, IUserService } from 'user/user.service.interface';

@Injectable()
export class GlobalSeed implements OnApplicationBootstrap {
  private logger = new Logger();
  constructor(
    private readonly userService: IUserService,
  ) {}
  async onApplicationBootstrap(): Promise<void> {
    await this.createAdmin();
  }

    async createAdmin() {
    try {
      const data: ICreateUserDTO= {
        email: 'admin.jurist@gmail.com',
        password: DataGenerator.randomString(22),
        name: 'Jurist Admin',
        phone: '+22890109010',
        address: 'Avedji, Lomé - Togo',
        role: RoleEnum.ADMIN,
        degree: 'Master',
      };
      let existed = await this.userService.search({
        phone: data.phone,
      });
      if (!existed)
        existed = await this.userService.search({
          email: data.email,
          phone: data.phone,
        });
      if (!existed) {
        const user = await this.userService.add(data);
        this.logger.log('ADMIN ====== USER', {
          phone: user?.phone,
          pwd: data.password,
        });
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::GlobalSeed.createAdmin');
    }
  }
}
