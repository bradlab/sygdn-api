import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth';
import { StaffGuard } from 'adapter/guard/auth.guard';
import { IUserService } from './user.service.interface';

@Module({
  imports: [ AuthModule],
  controllers: [UserController],
  providers: [StaffGuard, { provide: IUserService, useClass: UserService }],
  exports: [IUserService, AuthModule],
})
export class UserModule {}
