import 'reflect-metadata';
import { container } from 'tsyringe';

import RoleRepository from '@repositories/RoleRepository';
import RoleService from '@services/RoleService';
import RoleController from '@controllers/RoleController';

import UserRepository from '@repositories/UserRepository';
import UserService from '@services/UserService';
import UserController from '@controllers/UserController';

import AuthService from '@services/AuthService';
import AuthController from '@controllers/AuthController';

container.register('RoleRepository', RoleRepository);
container.register('RoleService', RoleService);
container.register('RoleController', RoleController);

container.register('UserRepository', UserRepository);
container.register('UserService', UserService);
container.register('UserController', UserController);

container.register('AuthService', AuthService);
container.register('AuthController', AuthController);

export default container;