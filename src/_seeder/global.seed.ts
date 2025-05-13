import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';

@Injectable()
export class GlobalSeed implements OnApplicationBootstrap {
  private logger = new Logger();
  constructor() {}
  async onApplicationBootstrap(): Promise<void> {
    await this.createAccess();
  }

  private async createAccess() {
    try {
      // const isOkay = await this.adminService.addBulk(RULES); // TODO: uncomment this line when you have permissions
      // if (isOkay) {
      //   this.logger.log('Permissions créés avec succès');
      // }
    } catch (error) {
      this.logger.log(error, 'CREATE::ACCESS => SEED');
    }
  }
}
