import { Test, TestingModule } from '@nestjs/testing';
import { StepService } from './step.service';
import { IDBRepository } from 'app/abstract/db.abstract';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { TestGlobalConfig } from 'test/test-config.spec';
import { IStepService, IUpdateStepDTO } from './step.service.interface';
import { STEP_DATA } from 'test/test.data.spec';
import { Step } from 'domain/model/step.model';

const data = STEP_DATA;
let respData = {} as Step;

describe('StepService', () => {
  let service: IStepService;
  let repository: IDBRepository;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        { provide: IStepService, useClass: StepService },
        {
          provide: IDBRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
        },
      ],
    }).compile();
    service = moduleRef.get<IStepService>(IStepService);
    repository = moduleRef.get(IDBRepository);
    respData = await TestGlobalConfig.mockRepositoryResponse(data);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('StepService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('DBRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('add', () => {
    it('should create a step if not exists', async () => {
      repository.steps.findOne = jest.fn().mockResolvedValue(null);
      repository.steps.create = jest.fn().mockResolvedValue(respData);

      const step = await service.add(data);
      expect(repository.domains.findOneByID).toHaveBeenCalled();
      expect(repository.steps.findOne).toHaveBeenCalled();
      expect(repository.steps.create).toHaveBeenCalled();
      expect(step).toBeDefined();
      expect(step).toEqual(respData);
    });

    it('should throw not found if domain does not exist', async () => {
      repository.steps.findOne = jest.fn().mockResolvedValue(null);
      repository.domains.findOneByID = jest.fn().mockResolvedValue(null);
      await expect(service.add(data)).rejects.toThrow(NotFoundException);
    });

    it('should throw conflict if step exists', async () => {
      repository.steps.findOne = jest.fn().mockResolvedValue(data);
      await expect(service.add(data)).rejects.toThrow(ConflictException);
    });
  });

  describe('fetchAll', () => {
    it('should return all steps', async () => {
      repository.steps.find = jest.fn().mockResolvedValue([data]);
      await expect(service.fetchAll()).resolves.toEqual([data]);
    });
  });

  describe('fetchOne', () => {
    it('should return a step by id', async () => {
      repository.steps.findOne = jest.fn().mockResolvedValue(data);
      await expect(service.fetchOne('step-uuid')).resolves.toEqual(data);
    });
    it('should throw not found if step does not exist', async () => {
      repository.steps.findOne = jest.fn().mockResolvedValue(undefined);
      await expect(service.fetchOne('step-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('edit', () => {
    it('should update a step', async () => {
    const dto: IUpdateStepDTO = { ...data, id: respData.id, name: 'Updated', };
      repository.steps.findOne = jest.fn().mockResolvedValue(respData);
      repository.steps.update = jest.fn().mockResolvedValue({
        ...respData,
        name: 'Updated',
      });
      const rep = await service.edit(dto);

      expect(repository.steps.findOne).toHaveBeenCalled();
      expect(repository.steps.update).toHaveBeenCalled();
      expect(rep).toEqual({ ...respData, name: 'Updated' });
    });
    it('should throw not found if step does not exist', async () => {
      repository.steps.findOne = jest.fn().mockResolvedValue(undefined);
      const dto: IUpdateStepDTO = { ...data, id: respData.id };
      await expect(service.edit(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a step', async () => {
      repository.steps.findOneByID = jest.fn().mockResolvedValue(data);
      repository.steps.removeMany = jest.fn().mockResolvedValue([data]);
      await expect(service.remove('step-uuid')).resolves.toBe(true);
    });
    it('should throw not found if step does not exist', async () => {
      repository.steps.findOneByID = jest.fn().mockResolvedValue(undefined);
      await expect(service.remove('step-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
