import Role from "../entity/Role";

class RoleService {

  public async create(name: string): Promise<Role> {
    name = name.trim().toUpperCase();

    if (await Role.findOne({ name })) {
      throw new Error("There is already a role with this name");
    }
    const newRole = Role.create({name});
    return await Role.save(newRole);
  }

  public async fetch(): Promise<Role[]> {
    return await Role.find();
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const deleteResult = await Role.delete({ id });

      return deleteResult.affected >= 1 ? true : false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async get(id: number): Promise<Role> {
    try {
      return await Role.findOne({ id } as Role);
    } catch (error) {
      throw new Error(error.message);
    }
  }


}

export default RoleService;