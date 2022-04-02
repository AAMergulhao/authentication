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

}

export default UserService;