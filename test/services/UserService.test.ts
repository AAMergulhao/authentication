import 'reflect-metadata';
import { IRoleRepository } from "@repositories/RoleRepository";
import { IUserRepository } from "@repositories/UserRepository";
import UserService from "@services/UserService";

import roleMock from '../mocks/role';
import userMock from '../mocks/user';


test("Should create a valid user.", async () => {
  const userService: UserService = new UserService({
    create() {
      return userMock;
    }
  } as unknown as IUserRepository, {} as unknown as IRoleRepository);

  const newUser = await userService.create(userMock.email, userMock.password);

  expect(newUser.id ? true : false).toBe(true);
});

test("Should find a valid user.", async () => {
  const userService: UserService = new UserService({
    get() {
      return userMock;
    }
  } as unknown as IUserRepository, {} as unknown as IRoleRepository);

  const user = await userService.getByEmail(userMock.email);

  expect(user.id ? true : false).toBe(true);
});

test("Should throw a exception searching for a user that does not exist.", async () => {
  const userService: UserService = new UserService({
    get() {
      throw new Error("error");
    }
  } as unknown as IUserRepository, {} as unknown as IRoleRepository);
  await expect(userService.get(100)).rejects.toThrow();
});

test("Should update a user e-mail.", async () => {
  const userService: UserService = new UserService({
    update() {
      return userMock;
    }
  } as unknown as IUserRepository, {} as unknown as IRoleRepository);

  const updatedUser = await userService.update({ email: userMock.email });

  expect(updatedUser.email === userMock.email).toBe(true);
});

test("Should throw a exception trying to update a email to an empty string.", async () => {
  const userService: UserService = new UserService({
    update() {
      return null;
    }
  } as unknown as IUserRepository, {} as unknown as IRoleRepository);

  await expect(userService.update({ email: '' })).rejects.toThrow();
});

test("Should add a role to a user", async () => {
  const userService: UserService = new UserService({
    get() {
      const user = { ...userMock };
      user.roles = [];
      return user;
    },
    update() {
      return userMock;
    }
  } as unknown as IUserRepository,
    {
      get() {
        return roleMock;
      }
    } as unknown as IRoleRepository
  );

  const user = await userService.getByEmail(userMock.email);

  const updatedUser = await userService.addRole(user.id, roleMock.id);

  expect(updatedUser.roles.length >= 1).toBe(true);
});

test("Should throw a exception trying to add a duplicate role.", async () => {
  const userService: UserService = new UserService({
    get() {
      return userMock;
    }
  } as unknown as IUserRepository,
    {
      get() {
        return roleMock;
      }
    } as unknown as IRoleRepository
  );

  const user = await userService.getByEmail(userMock.email);

  await expect(userService.addRole(user.id, roleMock.id)).rejects.toThrow();
});

test("Should throw a exception trying to add a role that does not exists.", async () => {
  const userService: UserService = new UserService({
    get() {
      return userMock;
    }
  } as unknown as IUserRepository,
    {
      get() {
        return null;
      }
    } as unknown as IRoleRepository
  );

  const user = await userService.getByEmail(userMock.email);

  await expect(userService.addRole(user.id, 100)).rejects.toThrow();
});

test("Should throw a exception trying to add a role to a user that does not exists.", async () => {
  const userService: UserService = new UserService({
    get() {
      return null;
    }
  } as unknown as IUserRepository,
    {
      get() {
        return roleMock;
      }
    } as unknown as IRoleRepository
  );
  await expect(userService.addRole(100, roleMock.id)).rejects.toThrow();
});

test("Should remove a role from a user", async () => {
  const userService: UserService = new UserService({
    get() {
      return userMock;
    },
    update() {
      const user = { ...userMock };
      user.roles = [];
      return user;
    }
  } as unknown as IUserRepository,
    {
      get() {
        return roleMock;
      }
    } as unknown as IRoleRepository
  );

  const user = await userService.getByEmail(userMock.email);

  const updatedUser = await userService.removeRole(user.id, roleMock.id);

  expect(updatedUser.roles.length === 0).toBe(true);
});

test("Should throw a exception trying to remove a role that the user does not possess.", async () => {
  const userService: UserService = new UserService({
    get() {
      const user = { ...userMock };
      user.roles = [];
      return user;
    }
  } as unknown as IUserRepository,
    {
      get() {
        return roleMock;
      }
    } as unknown as IRoleRepository
  );

  const user = await userService.getByEmail(userMock.email);

  await expect(userService.removeRole(user.id, roleMock.id)).rejects.toThrow();
});

test("Should throw a exception trying to remove a role from a user that does not exists.", async () => {
  const userService: UserService = new UserService({
    get() {
      return null;
    }
  } as unknown as IUserRepository, {} as unknown as IRoleRepository
  );
  await expect(userService.removeRole(100, roleMock.id)).rejects.toThrow();
});

test("Should throw a exception trying to remove a role that does not exists.", async () => {
  const userService: UserService = new UserService({
    get() {
      return userMock;
    }
  } as unknown as IUserRepository, {
    get() {
      return null;
    }
  } as unknown as IRoleRepository
  );

  const user = await userService.getByEmail('test@test.com');

  await expect(userService.removeRole(user.id, roleMock.id)).rejects.toThrow();
});

test("Should delete a user.", async () => {
  const userService: UserService = new UserService({
    delete() {
      return true;
    }
  } as unknown as IUserRepository, {} as unknown as IRoleRepository
  );

  const deleted = await userService.delete(userMock.id);

  expect(deleted).toBe(true);
});