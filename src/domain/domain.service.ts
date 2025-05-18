// /src/domains/domain.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  IDomainService,
  ICreateDomainDTO,
  IUpdateDomainDTO,
} from './domain.service.interface';
import { DeepQueryType } from 'domain/types';
import { IDomain } from 'domain/model/domain.model';
import { IDBRepository } from 'app/abstract/db.abstract';
import { Staff } from 'domain/model/staff.model';
import { DomainFactory } from 'adapter/factory/domain.factory';
import { DataHelper } from 'adapter/helper/data.helper';
import { VNot } from 'framework/orm.clauses';

@Injectable()
export class DomainService implements IDomainService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(data: ICreateDomainDTO): Promise<IDomain> {
    try {
      const existingDomain = await this.dbRepository.domains.findOne({
        where: {name: data.name },
      });

      if (existingDomain) {
        throw new ConflictException('Domain with the same type already exists');
      }

      return await this.dbRepository.domains.create(DomainFactory.create(data));
    } catch (error) {
      this.logger.error(error, 'ERROR::DomainService.add');
      throw error;
    }
  }

  async bulk(user: Staff, datas: ICreateDomainDTO[]): Promise<IDomain[]> {
    try {
      // Vérifier si une domain avec le même titre existe déjà
      const domains: IDomain[] = [];
      if (DataHelper.isNotEmptyArray(datas)) {
        for (const data of datas) {
          const existingDomain = await this.dbRepository.domains.findOne({
            where: {name: data.name },
          });
          if (!existingDomain) {
            domains.push(DomainFactory.create(data));
          }
        }
      }
      if (DataHelper.isNotEmptyArray(domains)) {
        return await this.dbRepository.domains.createMany(domains);
      }
      return [];
    } catch (error) {
      this.logger.error(error, 'ERROR::DomainService.add');
      throw error;
    }
  }

  async fetchAll(): Promise<IDomain[]> {
    try {
      return await this.dbRepository.domains.find({
        order: { updatedAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error(error, 'ERROR::DomainService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<IDomain> {
    try {
      const domain = await this.dbRepository.domains.findOne({
        where: { id },
      });
      return domain;
    } catch (error) {
      this.logger.error(error, 'ERROR::DomainService.fetchOne');
      throw error;
    }
  }

  async edit(data: IUpdateDomainDTO): Promise<IDomain> {
    try {
      const { id, name } = data;
      const domain = await this.fetchOne(data.id);
      if (!domain) throw new NotFoundException('Domain not found');
      const existed = name && await this.dbRepository.domains.findOne({
        where: { id: VNot(id), name },
      });
      if (existed) throw new ConflictException('Domain already exists');
      return await this.dbRepository.domains.update(
        DomainFactory.update(domain, data),
      );
    } catch (error) {
      this.logger.error(error, 'ERROR::DomainService.edit');
      throw error;
    }
  }

  async remove(ids: string[]): Promise<boolean> {
    try {
      const domains = await this.dbRepository.domains.findByIds(ids);
      if (DataHelper.isNotEmptyArray(domains)) {
        await this.dbRepository.domains.removeMany(domains);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(error, 'ERROR::DomainService.remove');
      return false;
    }
  }
}
