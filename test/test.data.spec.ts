import { faker } from '@faker-js/faker/.';
import { MaritalStatusEnum, RoleEnum } from 'app/enum';
import { Staff } from 'domain/model/staff.model';

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
