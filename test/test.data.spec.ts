import { faker } from '@faker-js/faker/.';
import { MaritalStatusEnum, RoleEnum } from 'app/enum';
import { IDomain } from 'domain/model/domain.model';
import { Staff } from 'domain/model/staff.model';
import { ICreateDomainDTO } from 'src/domain/domain.service.interface';

export const DOMAIN_DATA: ICreateDomainDTO = {
  name: faker.person.fullName(),
  description: faker.lorem.paragraph(),
};

export const DOMAIN_MODEL_DATA: Partial<IDomain> = {
  name: faker.person.fullName(),
  description: faker.lorem.paragraph(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
};

export const USER_DATA: Partial<Staff> = {
  name: faker.person.fullName(),
  degree: faker.person.jobArea(),
  role: faker.helpers.enumValue(RoleEnum),
  maritalStatus: faker.helpers.enumValue(MaritalStatusEnum),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
  address: faker.location.streetAddress(),
};

export const USER_MODEL_DATA: Partial<Staff> = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  degree: faker.person.jobArea(),
  role: faker.helpers.enumValue(RoleEnum),
  maritalStatus: faker.helpers.enumValue(MaritalStatusEnum),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
};
