import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';
import { UserService } from './user.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { TestGlobalConfig } from 'test/test-config.spec';
import { UserController } from './user.controller';
import { RoleEnum, SexEnum } from 'app/enum';
import { IDBRepository } from 'app/abstract/db.abstract';
import { ICreateUserDTO, IUserService } from './user.service.interface';
import { IAuthService } from 'auth/auth.service.interface';

describe('UserController', () => {
  let controller: UserController;
  let moduleRef: TestingModule;
  let repository: IDBRepository;
  let authService: IAuthService;

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const data: ICreateUserDTO = {
    role: faker.helpers.enumValue(RoleEnum),
    degree: faker.person.jobType(),
    name: faker.person.fullName(),
    phone: faker.phone.number({ style: 'international' }),
    email: faker.internet.email({ firstName, lastName }),
    password: faker.string.alphanumeric(8),
    address: faker.location.streetAddress(),
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [UserController],
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

    controller = moduleRef.get<UserController>(UserController);
    repository = moduleRef.get<IDBRepository>(IDBRepository);
    authService = moduleRef.get<IAuthService>(IAuthService);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Staff Execptions', () => {
    it('should throw Conflict error on create', () => {
      authService.search = jest.fn().mockResolvedValue(data);
      const mockCreate = async () => {
        await controller.create(data as any);
      };
      void expect(mockCreate).rejects.toThrow(ConflictException);
    });

    it('should throw not found error on edit', () => {
      repository.users.findOneByID = jest.fn().mockResolvedValue(undefined);
      repository.users.findOne = jest.fn().mockResolvedValue(undefined);
      const mockEdit = async () => {
        await controller.update({ ...data, id: "undefined" });
      };
      void expect(mockEdit).rejects.toThrow(NotFoundException);
    });

    it('should return false on remove', async () => {
      repository.users.findOneByID = jest.fn().mockResolvedValue(undefined);

      const resp = await controller.remove({ id: 'undefined'});
      expect(resp).toBeFalsy();
    });
  });
});
