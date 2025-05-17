import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { SexEnum } from 'app/enum';
import { TestGlobalConfig } from 'test/test-config.spec';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { IDBRepository } from 'app/abstract/db.abstract';
import { IAuthService } from 'auth/auth.service.interface';
import { ICreateUserDTO, IUserService } from './user.service.interface';
import { USER_DATA } from 'test/test.data.spec';

describe('UserService', () => {
  let service: IUserService;
  let moduleRef: TestingModule;
  let repository: IDBRepository;
  let authService: IAuthService;

  const id = faker.string.uuid();
  const password = faker.string.alphanumeric(8);

  const data = <ICreateUserDTO>{
    ...USER_DATA,
    password,
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [
        { provide: IUserService, useClass: UserService },
        {
          provide: IAuthService,
          useClass: jest.fn(() => TestGlobalConfig.mockService()),
        },
        {
          provide: IDBRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
        },
      ],
    }).compile();
    service = await moduleRef.resolve<IUserService>(IUserService);
    authService = await moduleRef.resolve<IAuthService>(IAuthService);
    repository = await moduleRef.resolve<IDBRepository>(IDBRepository);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('UserService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('DBRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('On fetch all users', () => {
    it('Should return empty array', async () => {
      // concurrent
      repository.users.find = jest
        .fn()
        .mockImplementationOnce(() => [])
        .mockImplementationOnce(async () => [
          await TestGlobalConfig.mockRepositoryResponse(data),
        ]);
      const users = await service.fetchAll();
      expect(repository.users.find).toHaveBeenCalledWith(expect.any(Object));
      expect(users).toBeInstanceOf(Array);
      expect(users).toHaveLength(0);
    });

    it('Should return an array of one staff', async () => {
      const users = await service.fetchAll();
      expect(users).toHaveLength(1);
    });
  });

  describe('On fetch one staff', () => {
    it('Should return an empty content', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() =>
          TestGlobalConfig.mockRepositoryResponse(data),
        );
      const staff = await service.fetchOne(id);
      expect(repository.users.findOneByID).toHaveBeenCalled();
      expect(staff).toBeFalsy();
    });

    it('Should return a staff object contain ID', async () => {
      repository.users.findOneByID = jest.fn().mockResolvedValue(TestGlobalConfig.mockRepositoryResponse(data));
      const staff = await service.fetchOne(id);
      expect(staff).toBeTruthy();
      expect(staff).toHaveProperty('id');
      expect(staff).toHaveProperty('createdAt');
    });
  });

  describe('On staff creation', () => {
    it('Should call repository methods', async () => {
      authService.search = jest.fn().mockResolvedValue(undefined);
      repository.users.findOne = jest.fn().mockResolvedValue(TestGlobalConfig.mockRepositoryResponse(data));
      await service.add(data);
      expect(authService.search).toHaveBeenCalledTimes(2);
      expect(repository.users.create).toHaveBeenCalledWith(expect.any(Object));
    });

    it('Should expect correct data', async () => {
      authService.search = jest.fn().mockResolvedValue(undefined);
      repository.users.create = jest.fn().mockResolvedValue(TestGlobalConfig.mockRepositoryResponse(data));
      const staff = await service.add(data);
      expect(staff).toBeDefined();
      expect({
        phone: staff?.phone,
        email: staff.email,
      }).toStrictEqual({ phone: data.phone, email: data.email });
      expect(staff.id).toBeDefined();
      expect(staff.id).toBeTruthy();
      expect(staff.id).toEqual(expect.any(String));
    });
  });

  describe('On staff update', () => {
    it('Should call repository methods', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementation(() =>
          TestGlobalConfig.mockRepositoryResponse(data),
        );
      repository.users.findOne = jest.fn().mockResolvedValue(undefined);
      
      await service.edit({ ...data, id });
      expect(repository.users.findOneByID).toHaveBeenCalled();
      expect(repository.users.findOne).toHaveBeenCalled();
      expect(repository.users.update).toHaveBeenCalledWith(
        expect.objectContaining({ id: expect.any(String), ...data }),
      );
    });

    it('Should expect correct data', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementation(() =>
          TestGlobalConfig.mockRepositoryResponse(data),
        );
      repository.users.findOne = jest.fn().mockResolvedValue(undefined);
      const email = faker.internet.email();
      repository.users.update = jest.fn().mockImplementation(() => {
        return TestGlobalConfig.mockRepositoryResponse({...data, email});
      });
      const staff = await service.edit({ ...data, email, id });
      expect(staff).toBeDefined();
      expect(staff.phone).toEqual(data.phone);
      expect(staff.email).toEqual(email);
      expect(staff.id).toBeDefined();
      expect(staff.id).toBeTruthy();
      expect(staff.id).toEqual(expect.any(String));
    });
  });

  describe('On remove staff', () => {
    it('Should return false response', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementationOnce(() => undefined);
      const staff = await service.remove(id);
      expect(repository.users.remove).not.toHaveBeenCalled();
      expect(staff).toBeFalsy();
    });

    it('Should return a staff object contain ID', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementation(() =>
          TestGlobalConfig.mockRepositoryResponse(data),
        );
      const staff = await service.remove(id);
      expect(repository.users.remove).toHaveBeenCalledWith(
        expect.objectContaining(data),
      );
      expect(staff).toBeTruthy();
    });
  });
});
