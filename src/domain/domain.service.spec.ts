import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DomainService } from './domain.service';
import {
  IDomainService,
  ICreateDomainDTO,
} from './domain.service.interface';
import { TestGlobalConfig } from 'test/test-config.spec';
import {
  DOMAIN_DATA
} from 'test/test.data.spec';
import { IDBRepository } from 'app/abstract/db.abstract';

describe('DomainService', () => {
  let service: IDomainService;
  let repository: IDBRepository;
  let moduleRef: TestingModule;

  const data: ICreateDomainDTO = DOMAIN_DATA;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        { provide: IDomainService, useClass: DomainService },
        {
          provide: IDBRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
        },
      ],
    }).compile();

    service = moduleRef.get<IDomainService>(IDomainService);
    repository = moduleRef.get<IDBRepository>(IDBRepository);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('DomainService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('DBRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('On domains creation', () => {
    it('should throw conflict exception if duplicate domain exists', async () => {
      repository.domains.findOne = jest
        .fn()
        .mockResolvedValue(TestGlobalConfig.mockRepositoryResponse(data));
      const mockCreate = async () => {
        await service.add(data);
      };

      await expect(mockCreate).rejects.toThrow(ConflictException);
    });

    it('should create correctly domains', async () => {
      repository.domains.findOne = jest.fn().mockResolvedValue(null);
      repository.domains.create = jest
        .fn()
        .mockResolvedValueOnce(TestGlobalConfig.mockRepositoryResponse(data));

      const domains = await service.add(data);
      expect(repository.domains.findOne).toHaveBeenCalled();
      expect(repository.domains.create).toHaveBeenCalled();
      expect(domains).toBeInstanceOf(Object);
      expect(domains).toBeDefined();
    });
  });

  describe('On fetch all domains', () => {
    it('Should return empty array', async () => {
      // concurrent
      repository.domains.find = jest
        .fn()
        .mockImplementationOnce(() => [])
        .mockImplementationOnce(async () => [
          await TestGlobalConfig.mockRepositoryResponse(data),
        ]);
      const domains = await service.fetchAll();
      expect(repository.domains.find).toHaveBeenCalled();
      expect(domains).toBeInstanceOf(Array);
      expect(domains).toHaveLength(0);
    });

    it('Should return an array of one domains', async () => {
      const domains = await service.fetchAll();
      expect(domains).toHaveLength(1);
    });
  });
});
