import Role from "entity/Role";
import { IRoleRepository } from "@repositories/RoleRepository";

import { injectable, inject } from 'tsyringe';

export interface IRoleService {
  create(name: string): Promise<Role>,
  fetch(): Promise<Role[]>,
  delete(id: number): Promise<boolean>,
  get(id: number): Promise<Role>
}

@injectable()
class RoleService implements IRoleService {

  constructor(@inject('RoleRepository') private roleRepository: IRoleRepository) { }
  public async create(name: string): Promise<Role> {
    name = name.trim().toUpperCase();

    if (await this.roleRepository.get({ name } as Role)) {
      throw new Error("There is already a role with this name");
    }
    return await this.roleRepository.create(name);
  }

  public async fetch(): Promise<Role[]> {
    return await this.roleRepository.fetch();
  }

  public async delete(id: number): Promise<boolean> {
    try {
      return await this.roleRepository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Role> {
    try {
      return await this.roleRepository.get({ id } as Role);
    } catch (error) {
      throw new Error(error.message);
    }
  }


}

export default RoleService;