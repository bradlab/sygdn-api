/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { In, ObjectLiteral, Repository } from 'typeorm';
import { IGenericRepository } from 'domain/abstract';

export class DBGenericRepository<T extends ObjectLiteral>
  implements IGenericRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  find(options?: any): Promise<T[]> {
    return this._repository.find(options);
  }

  findBy(options: any): Promise<T[]> {
    return this._repository.find({ ...options });
  }

  findAndCount(options: any): Promise<[T[], number]> {
    return this._repository.findAndCount({ ...options });
  }

  count(options: any): Promise<number> {
    return this._repository.count({ ...options });
  }

  countBy(options: any): Promise<number> {
    return this._repository.countBy({ ...options });
  }

  async sum(field: any, options?: any): Promise<number> {
    return await  this._repository.sum(field, options) ?? 0;
  }

  async average(field: any, options?: any): Promise<number> {
    return await  this._repository.average(field, options) ?? 0;
  }

  async min(field: any, options?: any): Promise<number> {
    return await  this._repository.minimum(field, options) ?? 0;
  }

  async max(field: any, options?: any): Promise<number> {
    return await  this._repository.maximum(field, options) ?? 0;
  }

  async findOneByID(id: string, options?: any): Promise<T> {
    options = { ...options, id };
    return (await this._repository.findOne({
      where: { ...options },
    })) as unknown as T;
  }

  async findByIds(ids: string[], options?: any): Promise<T[]> {
    const customQuery: any = { id: In(ids), ...options };
    if (ids?.length > 0) {
      return await this._repository.findBy({ ...customQuery });
    }
    return [];
  }

  async findOne(options: any): Promise<T> {
    return this._repository.findOne({ ...options }) as unknown as T;
  }

  async findOneBy(options: any): Promise<T> {
    return this._repository.findOneBy(options) as unknown as T;
  }

  create(item: T): Promise<T> {
    return this._repository.save(item);
  }

  createMany(items: T[]): Promise<T[]> {
    return this._repository.save(items);
  }

  updateMany(items: T[]) {
    return this._repository.save(items);
  }

  update(item: T) {
    return this._repository.save(item);
  }

  clean(items: any): Promise<any> {
    // This method remove permanently
    return this._repository.remove(items);
  }

  removeMany(items: T[]): Promise<T[]> {
    return this._repository.softRemove(items);
  }

  remove(item: T): Promise<T> {
    return this._repository.softRemove(item);
  }
}
