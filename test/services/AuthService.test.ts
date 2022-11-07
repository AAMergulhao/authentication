import 'reflect-metadata';
import AuthService, { hashPassword } from "@services/AuthService";

import roleMock from '../mocks/role';
import userMock from '../mocks/user';
import { IUserRepository } from '@repositories/UserRepository';
import { IRoleRepository } from '@repositories/RoleRepository';
import UserService from '@services/UserService';

const roleRepository = {
  get() {
    return roleMock;
  }
} as unknown as IRoleRepository;

test('Should sign up a new user', async () => {
  const userRepository = {
    get() {
      return null;
    },
    create() {
      return userMock;
    }
  } as unknown as IUserRepository;

  const authService: AuthService = new AuthService(new UserService(userRepository, roleRepository), userRepository);
  const signed = await authService.signUp(userMock.email, userMock.password);

  expect(signed).toBe(true);
});

test('Should sign in a user', async () => {
  const passwordHash = await hashPassword(userMock.password);
  const userRepository = {
    get() {
      return { ...userMock, password: passwordHash };
    }
  } as unknown as IUserRepository;

  const authService: AuthService = new AuthService(new UserService(userRepository, roleRepository), userRepository);
  const tokens = await authService.signIn(userMock.email, userMock.password);

  expect(tokens.accessToken ? true : false).toBe(true);
});

test('Should refresh the tokens', async () => {
  const passwordHash = await hashPassword(userMock.password);
  const userRepository = {
    get() {
      return { ...userMock, password: passwordHash };
    }
  } as unknown as IUserRepository;

  const authService: AuthService = new AuthService(new UserService(userRepository, roleRepository), userRepository);
  const tokens = await authService.signIn(userMock.email, userMock.password);

  const refreshedTokens = await authService.refresh(tokens.refreshToken);
  expect(refreshedTokens.accessToken ? true : false).toBe(true);
});

test('Should verify a valid accessToken', async () => {
  const passwordHash = await hashPassword(userMock.password);
  const userRepository = {
    get() {
      return { ...userMock, password: passwordHash };
    }
  } as unknown as IUserRepository;

  const authService: AuthService = new AuthService(new UserService(userRepository, roleRepository), userRepository);
  const tokens = await authService.signIn(userMock.email, userMock.password);

  const decoded = await authService.verify(tokens.accessToken);
  expect(decoded.id ? true : false).toBe(true);
});