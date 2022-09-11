import RoleService from "../../src/services/RoleService";
import { closeDatabaseConnection, createDatabaseConnection } from "../../src/utils/database";

const roleService: RoleService = new RoleService();

beforeAll(async () => {
  await createDatabaseConnection();
});

test("Should create a valid role", async () => {
  const newRole = await roleService.create(`TEST_ROLE`);
  expect(newRole.hasId()).toBe(true);
});

test("Should throw a exception passing a duplicate role name.", async () => {
  await expect(roleService.create('TEST_ROLE')).rejects.toThrow();
});

test("Should find a valid role.", async () => {
  const role = await roleService.get(3);

  expect(role.hasId()).toBe(true);
});

test("Should get a list of roles", async () => {
  const roles = await roleService.fetch();

  expect(roles.length >= 1).toBe(true);
});

test("Should delete a role", async () => {
  const deleted = await roleService.delete(3);

  expect(deleted).toBe(true);
});

afterAll(async () => {
  await closeDatabaseConnection();
});