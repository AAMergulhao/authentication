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
}

export default UserService;