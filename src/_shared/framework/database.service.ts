import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DBGenericRepository } from 'framework/database.repository';
import { Repository } from 'typeorm';
import { StaffEntity } from './schema/staff.entity';
import { IDBRepository } from 'app/abstract/db.abstract';
import { DomainEntity } from './schema/domain.entity';
@Injectable()
export class DBRepository implements IDBRepository, OnApplicationBootstrap {
  users: DBGenericRepository<StaffEntity>;
  domains: DBGenericRepository<DomainEntity>;

  constructor(
    @InjectRepository(StaffEntity)
    private userRepository: Repository<StaffEntity>,

    @InjectRepository(DomainEntity)
    private domainRepository: Repository<DomainEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.users = new DBGenericRepository<StaffEntity>(this.userRepository);
    this.domains = new DBGenericRepository<DomainEntity>(this.domainRepository);
  }
}
