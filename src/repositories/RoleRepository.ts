import Role from "@entity/Role";

import { injectable } from 'tsyringe';

export interface IRoleRepository {
  create(name: string): Promise<Role>,
  get(role: Role): Promise<Role>,
  fetch(): Promise<Role[]>
  delete(id: number): Promise<boolean>
}

@injectable()
class RoleRepository implements IRoleRepository {

  public async get(role: Role): Promise<Role> {
    return await Role.findOne(role);
  }

  public async fetch(): Promise<Role[]> {
    return await Role.find();
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult = await Role.delete({ id });

    return deleteResult.affected >= 1 ? true : false;
  }

  public async create(name: string): Promise<Role> {
    const newRole = Role.create({ name });
    return await Role.save(newRole);
  }


}

export default RoleRepository;