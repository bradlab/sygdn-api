import { faker } from '@faker-js/faker/.';

export const USER_DATA: Partial<any> = {
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
};

export const USER_MODEL_DATA: Partial<any> = {
  id: faker.string.uuid(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
};
