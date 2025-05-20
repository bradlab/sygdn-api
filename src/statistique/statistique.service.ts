import { Injectable } from '@nestjs/common';
import {
  IStatisticQueryDTO,
  IStatistiqueService,
} from './statistique.service.interface';
import { StepStatusEnum } from 'app/enum';
import { IDBRepository } from 'app/abstract/db.abstract';
import { VBetween, VNot, VIsNull, VLessThan } from 'framework/orm.clauses';

@Injectable()
export class StatistiqueService implements IStatistiqueService {
  constructor(private readonly dbRepository: IDBRepository) {}

  async dossiersPerMonth(query: IStatisticQueryDTO) {
    const year = query.year || new Date().getFullYear();
    const results: { month: number; total: number }[] = [];
    for (let month = 1; month <= 12; month++) {
      const count = await this.dbRepository.dossiers.count({
        where: {
          createdAt: VBetween(
            new Date(year, month - 1, 1),
            new Date(year, month, 0),
          ),
        },
      });
      results.push({ month, total: count });
    }
    return results;
  }

  async dossiersStatusDistribution(query: IStatisticQueryDTO) {
    const statuses = [
      StepStatusEnum.PENDING,
      StepStatusEnum.IN_PROGRESS,
      StepStatusEnum.COMPLETED,
    ];
    const results = await Promise.all(
      statuses.map(async (status) => ({
        status,
        total: await this.dbRepository.dossiers.count({
          where: { affectations: { status } },
        }),
      })),
    );
    return results;
  }

  async averageDossierProcessingTime(query: IStatisticQueryDTO) {
    const dossiers = await this.dbRepository.dossiers.find({
      where: { affectations: { closedAt: VNot(VIsNull()) } },
    });
    // if (!dossiers.length) return { averageProcessingTimeSeconds: 0 };
    // const total = dossiers.reduce((acc, dossier) => {
    //     let aftotal = 0;
    //     dossier.affectations.reduce((s, affect) => {
    //         if (affect.closedAt) {
    //             const diff = (affect.closedAt.getTime() - dossier.createdAt.getTime()) / 1000;
    //             aftotal = s + diff;
    //         }
    //         aftotal = s;
    //     })
    //   const diff = (dossier.closedAt.getTime() - dossier.createdAt.getTime()) / 1000;
    //   return acc + diff;
    // }, 0);
    // return { averageProcessingTimeSeconds: Math.round(total / dossiers.length) };
  }

  async lateTasksByStaff(query: IStatisticQueryDTO) {
    // const tasks = await this.dbRepository.tasks.find({
    //   where: { dueDate: VLessThan(new Date()), status: VNot('done') },
    // });
    // const map = new Map<string, number>();
    // for (const task of tasks) {
    //   if (!task.staffId) continue;
    //   map.set(task.staffId, (map.get(task.staffId) || 0) + 1);
    // }
    // return Array.from(map.entries()).map(([staff, total]) => ({
    //   staff,
    //   total,
    // }));
    return [];
  }

  async topDossiersByComments(query: IStatisticQueryDTO) {
    // const comments = await this.dbRepository.comments.find({});
    // const map = new Map<string, number>();
    // for (const comment of comments) {
    //   if (!comment.dossierId) continue;
    //   map.set(comment.dossierId, (map.get(comment.dossierId) || 0) + 1);
    // }
    // const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    // const limit = query.limit || 5;
    // return sorted
    //   .slice(0, limit)
    //   .map(([dossier, total]) => ({ dossier, total }));
    return [];
  }
}
