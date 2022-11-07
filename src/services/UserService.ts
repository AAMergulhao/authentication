import Role from '@entity/Role';
import User, { UserI } from '@entity/User';
import { IRoleRepository } from '@repositories/RoleRepository';
import { IUserRepository } from '@repositories/UserRepository';

import { inject, injectable } from 'tsyringe';

export interface IUserService {
  create(email: string, password: string): Promise<User>,
  get(id: number): Promise<User>,
  update(user: UserI): Promise<UserI>,
  delete(id: number): Promise<boolean>
  addRole(userId: number, roleId: number): Promise<User>,
  removeRole(userId: number, roleId: number): Promise<User>,
  getByEmail(email: string): Promise<User>,
  getByEmailAndPassword(email: string, password: string): Promise<User>
}
@injectable()
class UserService implements IUserService {

  constructor(@inject('UserRepository') private userRepository: IUserRepository, @inject('RoleRepository') private roleRepository: IRoleRepository) { }

  public create = async (email: string, password: string): Promise<User> => {
    try {
      if (!email.trim() || !password.trim()) {
        throw new Error('E-mail and password cannot be null or empty.');
      }

      return await this.userRepository.create(email, password);
    } catch (error) {
      throw new Error(error.message);
    }

  };

  public async get(id: number): Promise<User> {
    try {
      const user = await this.userRepository.get({ id } as User);
      if (!user) {
        throw new Error('User not found');
      }

      delete user.password;

      return user;
    } catch (error) {
      throw new Error(error.message);

    }
  }

  public async update(user: UserI): Promise<UserI> {
    try {
      if (user.email.trim() === "") {
        throw new Error('E-mail cannot be null or empty');
      }

      const updatedUser = await this.userRepository.update(user as User);

      delete updatedUser.password;

      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async addRole(userId: number, roleId: number): Promise<User> {
    const user = await this.get(userId);

    if (!user) {
      throw new Error('User does not exists');
    }

    const role = await this.roleRepository.get({ id: roleId } as Role);

    if (!role) {
      throw new Error('Role does not exists');
    }

    const userAlreadyHaveRole = user.roles.find((userRole) => { return userRole.id === role.id });
    if (userAlreadyHaveRole) {
      throw new Error("User already have this role");
    }

    user.roles.push(role);

    return await this.userRepository.update(user as User);
  }

  public async removeRole(userId: number, roleId: number): Promise<User> {
    const user = await this.get(userId);

    if (!user) {
      throw new Error('User does not exists');
    }

    const role = await this.roleRepository.get({ id: roleId } as Role);

    if (!role) {
      throw new Error('Role does not exists');
    }

    const userAlreadyHaveRole = user.roles.find((userRole) => { return userRole.id === role.id });
    if (!userAlreadyHaveRole) {
      throw new Error("User does not have this role");
    }

    user.roles = user.roles.filter(role => {
      return role.id !== roleId;
    });

    return await this.userRepository.update(user as User);
  }

  public async getByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.get({ email } as User);
      if (!user) {
        throw new Error('User not found');
      }

      delete user.password;

      return user;
    } catch (error) {
      throw new Error(error.message);

    }
  }

  public async getByEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.get({ email, password } as User);
      if (!user) {
        throw new Error('User not found');
      }

      delete user.password;

      return user;
    } catch (error) {
      throw new Error(error.message);

    }
  }

}

export default UserService;