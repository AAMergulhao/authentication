import UserService from "../../src/services/UserService";
import { closeDatabaseConnection, createDatabaseConnection } from "../../src/utils/database";

const userService: UserService = new UserService();

beforeAll(async () => {
  await createDatabaseConnection();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

test("Should create a valid user.", async () => {
  const newUser = await userService.create('test@test.com', 'Password123');

  expect(newUser.hasId()).toBe(true);
});

test("Should find a valid user.", async () => {
  const user = await userService.getByEmail('test@test.com');

  expect(user.hasId()).toBe(true);
});

test("Should throw a exception searching for a user tath does not exist.", async () => {
  await expect(userService.get(100)).rejects.toThrow();
});

test("Should update a user e-mail.", async () => {
  const updatedUser = await userService.update({ email: 'update@test.com' });

  expect(updatedUser.email === 'update@test.com').toBe(true);
});

test("Should throw a exception trying to update a email to an empty string.", async () => {
  await expect(userService.update({ email: '' })).rejects.toThrow();
});

test("Should add a role to a user", async () => {
  const user = await userService.getByEmail('test@test.com');

  const updatedUser = await userService.addRole(user.id, 1);

  expect(updatedUser.roles.length >= 1).toBe(true);
});

test("Should throw a exception trying to add a duplicate role.", async () => {
  const user = await userService.getByEmail('test@test.com');

  await expect(userService.addRole(user.id, 1)).rejects.toThrow();
});

test("Should throw a exception trying to add a role that does not exists.", async () => {
  const user = await userService.getByEmail('test@test.com');

  await expect(userService.addRole(user.id, 100)).rejects.toThrow();
});

test("Should throw a exception trying to add a role to a user that does not exists.", async () => {
  await expect(userService.addRole(100, 1)).rejects.toThrow();
});

test("Should remove a role from a user", async () => {
  const user = await userService.getByEmail('test@test.com');

  const updatedUser = await userService.removeRole(user.id, 1);

  expect(updatedUser.roles.length === 0).toBe(true);
});

test("Should throw a exception trying to remove a role that the user does not possess.", async () => {
  const user = await userService.getByEmail('test@test.com');

  await expect(userService.removeRole(user.id, 1)).rejects.toThrow();
});

test("Should throw a exception trying to remove a role from a user that does not exists.", async () => {
  await expect(userService.removeRole(100, 1)).rejects.toThrow();
});

test("Should throw a exception trying to remove a role that does not exists.", async () => {
  const user = await userService.getByEmail('test@test.com');

  await expect(userService.removeRole(user.id, 100)).rejects.toThrow();
});

test("Should delete a user.", async () => {
  const deleted = await userService.delete(1);

  expect(deleted).toBe(true);
});