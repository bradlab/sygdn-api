import { faker } from '@faker-js/faker/.';
import { MaritalStatusEnum, RoleEnum } from 'app/enum';
import { IDomain } from 'domain/model/domain.model';
import { Staff } from 'domain/model/staff.model';
import { Step } from 'domain/model/step.model';
import { ICreateDomainDTO } from 'src/domain/domain.service.interface';
import { ICreateStepDTO } from 'step/step.service.interface';

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

export const STEP_DATA: ICreateStepDTO = {
  name: faker.person.fullName(),
  description: faker.lorem.paragraph(),
  duration: faker.number.int({ min: 1, max: 30 }),
  order: faker.number.int({ min: 1, max: 10 }),
  domainId: faker.string.uuid(),
};

export const STEP_MODEL_DATA: Partial<Step> = {
  name: faker.person.fullName(),
  description: faker.lorem.paragraph(),
  duration: faker.number.int({ min: 1, max: 30 }),
  order: faker.number.int({ min: 1, max: 10 }),
  domain: DOMAIN_MODEL_DATA as IDomain,
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
