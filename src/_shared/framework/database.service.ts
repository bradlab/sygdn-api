import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DBGenericRepository } from 'framework/database.repository';
import { Repository } from 'typeorm';
import { StaffEntity } from './schema/staff.entity';
import { IDBRepository } from 'app/abstract/db.abstract';
@Injectable()
export class DBRepository implements IDBRepository, OnApplicationBootstrap {
  users: DBGenericRepository<StaffEntity>;

  constructor(
    @InjectRepository(StaffEntity)
    private userRepository: Repository<StaffEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.users = new DBGenericRepository<StaffEntity>(this.userRepository);
  }
}
