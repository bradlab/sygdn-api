import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { DataGenerator } from 'domain/generator/data.generator';
import { Staff } from 'domain/model/staff.model';

@Injectable()
export class GlobalSeed implements OnApplicationBootstrap {
  private logger = new Logger();
  constructor() {}
  async onApplicationBootstrap(): Promise<void> {
    await this.createAdmin();
  }

    async createAdmin() {
    try {
      const data: Partial<Staff> = {
        email: 'admin.jurist@gmail.com',
        password: DataGenerator.randomString(),
        name: 'Jurist Admin',
        phone: '+22890109010',
        address: 'Avedji, Lomé - Togo',
      };
      // let existed = await this.adminService.search({
      //   phone: data.phone,
      // });
      // if (!existed)
      //   existed = await this.adminService.search({
      //     email: data.email,
      //     phone: data.phone,
      //   });
      // if (!existed) {
      //   const user = await this.adminService.add(data);
      //   this.logger.log('ADMIN ====== USER', {
      //     phone: user?.phone,
      //     pwd: data.password,
      //   });
      // }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::GlobalSeed.createAdmin');
    }
  }
}
