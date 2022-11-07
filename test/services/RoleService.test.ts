import 'reflect-metadata';
import { IRoleRepository } from "@repositories/RoleRepository";
import RoleService from "@services/RoleService";

test("Should create a valid role", async () => {
  const roleService = new RoleService({
    async create(name: string) {
      return { id: 1, name };
    },
    async get() {
      return null;
    }
  } as unknown as IRoleRepository);

  const newRole = await roleService.create(`TEST_ROLE`);

  expect(newRole.id ? true : false).toBe(true);
});

test("Should throw a exception passing a duplicate role name.", async () => {
  const roleService = new RoleService({
    async get(name) {
      return { id: 1, name };
    }
  } as unknown as IRoleRepository);

  await expect(roleService.create('TEST_ROLE')).rejects.toThrow();
});

test("Should find a valid role.", async () => {
  const roleService = new RoleService({
    async get(id) {
      return { id };
    }
  } as unknown as IRoleRepository);

  const role = await roleService.get(1);

  expect(role.id ? true : false).toBe(true);
});

test("Should get a list of roles", async () => {
  const roleService = new RoleService({
    async fetch() {
      return [{ id: 1 }];
    }
  } as unknown as IRoleRepository);

  const roles = await roleService.fetch();

  expect(roles.length >= 1).toBe(true);
});

test("Should delete a role", async () => {
  const roleService = new RoleService({
    async delete() {
      return true;
    }
  } as unknown as IRoleRepository);

  const deleted = await roleService.delete(1);

  expect(deleted).toBe(true);
});