import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { IDossierService, ICreateDossierDTO, IUpdateDossierDTO } from './dossier.service.interface';
import { Dossier } from 'domain/model/dossier.model';
import { IDBRepository } from 'app/abstract/db.abstract';
import { DossierFactory } from 'adapter/factory/dossier.factory';

@Injectable()
export class DossierService implements IDossierService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(input: ICreateDossierDTO): Promise<Dossier> {
    try {
      const existing = await this.dbRepository.dossiers.findOne({ where: { name: input.name, domain: input.domainId } });
      if (existing) throw new ConflictException('Dossier with the same name already exists in this domain');
      const domain = await this.dbRepository.domains.findOneByID(input.domainId);
      if (!domain) throw new NotFoundException('Domain not found');
      return await this.dbRepository.dossiers.create(DossierFactory.create(input, domain));
    } catch (error) {
      this.logger.error(error, 'ERROR::DossierService.add');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Dossier> {
    const dossier = await this.dbRepository.dossiers.findOneByID(id);
    if (!dossier) throw new NotFoundException('Dossier not found');
    return dossier;
  }

  async fetchAll(): Promise<Dossier[]> {
    try {
      return await this.dbRepository.dossiers.find();
    } catch (error) {
      this.logger.error(error, 'ERROR::DossierService.fetchAll');
      throw error;
    }
  }

  async edit(input: IUpdateDossierDTO): Promise<Dossier> {
    try {
      const dossier = await this.dbRepository.dossiers.findOneByID(input.id);
      if (!dossier) throw new NotFoundException('Dossier not found');
      let domain = dossier.domain;
      if (input.domainId && input.domainId !== (dossier.domain as any)?.id) {
        domain = await this.dbRepository.domains.findOneByID(input.domainId);
        if (!domain) throw new NotFoundException('Domain not found');
      }
      const updated = { ...dossier, ...input, domain };
      return this.dbRepository.dossiers.update(updated);
    } catch (error) {
      this.logger.error(error, 'ERROR::DossierService.edit');
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const dossier = await this.dbRepository.dossiers.findOneByID(id);
      if (!dossier) throw new NotFoundException('Dossier not found');
      await this.dbRepository.dossiers.removeMany([dossier]);
      return true;
    } catch (error) {
      this.logger.error(error, 'ERROR::DossierService.remove');
      throw error;
    }
  }
}
