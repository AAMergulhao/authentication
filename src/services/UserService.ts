import Role from '../entity/Role';
import User, { UserI } from '../entity/User';

class UserService {

    public async get(id: number): Promise<UserI> {
        try {
            const user = await User.findOne({ id }, { relations: ['roles'] });
            if (!user) {
                throw new Error('User not found');
            }

            delete user.password;
            return user
        } catch (error) {
            throw new Error(error.message);

        }
    }

    public async update(user: UserI): Promise<UserI> {
        try {
            if (user.email.trim() === "") {
                throw new Error('E-mail cannot be null or empty');
            }
            await User.save(user as User);

            const updatedUser = await User.findOne({ id: user.id });

            delete updatedUser.password;

            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            const deleteResult = await User.delete({ id });

            return deleteResult.affected >= 1 ? true : false;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async addRole(userId: number, roleId: number): Promise<User> {
        const user = await this.get(userId);

        if (!user) {
            throw new Error('User does not exists');
        }

        const role = await Role.findOne({ id: roleId });

        if (!role) {
            throw new Error('Role does not exists');
        }

        const userAlreadyHaveRole = user.roles.find((userRole) => { return userRole.id === role.id });
        if (userAlreadyHaveRole) {
            throw new Error("User already have this role");
        }

        user.roles.push(role);

        return await User.save(user as User);
    }

    public async removeRole(userId: number, roleId: number): Promise<User> {
        let user = await this.get(userId);

        if (!user) {
            throw new Error('User does not exists');
        }

        const role = await Role.findOne({ id: roleId });

        if (!role) {
            throw new Error('Role does not exists');
        }

        const userAlreadyHaveRole = user.roles.find((userRole) => { return userRole.id === role.id });
        if (!userAlreadyHaveRole) {
            throw new Error("User does not have this role");
        }

        user.roles = user.roles.filter(role => {
            return role.id !== roleId
        })

        return await User.save(user as User);
    }

}

export default UserService;