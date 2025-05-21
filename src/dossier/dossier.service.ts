import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  IDossierService,
  ICreateDossierDTO,
  IUpdateDossierDTO,
} from './dossier.service.interface';
import { Dossier } from 'domain/model/dossier.model';
import { IDBRepository } from 'app/abstract/db.abstract';
import { DossierFactory } from 'adapter/factory/dossier.factory';

@Injectable()
export class DossierService implements IDossierService {
  private readonly logger = new Logger();
  constructor(private dbRepository: IDBRepository) {}

  async add(data: ICreateDossierDTO): Promise<Dossier> {
    try {
      const existing = await this.dbRepository.dossiers.findOne({
        where: { name: data.name, domain: { id: data.domainId } },
      });
      if (existing)
        throw new ConflictException(
          'Dossier with the same name already exists in this domain',
        );
      const domain = await this.dbRepository.domains.findOneByID(data.domainId);
      if (!domain) throw new NotFoundException('Domain not found');
      return await this.dbRepository.dossiers.create(
        DossierFactory.create(data, domain),
      );
    } catch (error) {
      this.logger.error(error, 'ERROR::DossierService.add');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Dossier> {
    const dossier = await this.dbRepository.dossiers.findOne({
      where: { id },
      relations: {
        domain: true,
        steps: {step: true},
        comments: true,
        affectations: { staff: true, user: true, task: true },
      },
    });
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

  async edit(data: IUpdateDossierDTO): Promise<Dossier> {
    try {
      const dossier = await this.dbRepository.dossiers.findOneByID(data.id);
      if (!dossier) throw new NotFoundException('Dossier not found');
      let domain = dossier.domain;
      if (data.domainId && data.domainId !== (dossier.domain as any)?.id) {
        domain = await this.dbRepository.domains.findOneByID(data.domainId);
        if (!domain) throw new NotFoundException('Domain not found');
      }
      const updated = { ...dossier, ...data, domain };
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

  async findAllByClientWithDetails(filter: {
    clientId: string;
    staffId?: string;
    status?: string;
    page?: number;
    pageSize?: number;
    [key: string]: any;
  }): Promise<any> {
    const {
      clientId,
      staffId,
      status,
      page = 1,
      pageSize = 10,
      ...rest
    } = filter;
    const qb =
      this.dbRepository.dossiers['_repository'].createQueryBuilder('dossier');
    qb.leftJoinAndSelect('dossier.steps', 'step')
      .leftJoinAndSelect('step.tasks', 'task')
      .leftJoinAndSelect('dossier.comments', 'comment');
    qb.where('dossier.domain = :clientId', { clientId });
    if (status) qb.andWhere('dossier.status = :status', { status });
    if (staffId) qb.andWhere('comment.staff = :staffId', { staffId });
    // Pagination
    qb.skip((page - 1) * pageSize).take(pageSize);
    // Ajout d'autres filtres dynamiques si besoin
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) {
        qb.andWhere(`dossier.${key} = :${key}`, { [key]: value });
      }
    }
    // Exécution
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, pageSize };
  }
}
