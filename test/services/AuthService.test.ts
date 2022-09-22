import { closeDatabaseConnection, createDatabaseConnection } from "../../src/utils/database";

import AuthService from "../../src/services/AuthService";

const authService: AuthService = new AuthService();

beforeAll(async () => {
  await createDatabaseConnection();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

test('Should sign up a new user', async () => {
  const signed = await authService.signUp('auth@test.com', 'Password@123');

  expect(signed).toBe(true);
});