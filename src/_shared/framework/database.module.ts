import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBRepository } from './database.service';
import { StaffEntity } from './schema/staff.entity';
import { IDBRepository } from 'app/abstract/db.abstract';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffEntity,
    ]),
  ],
  providers: [
    {
      provide: IDBRepository,
      useClass: DBRepository,
    },
  ],
  exports: [IDBRepository],
})
export class DBRepositoryModule {}
