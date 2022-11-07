import User from '@entity/User';
import { injectable } from 'tsyringe';

export interface IUserRepository {
  create(email: string, password: string): Promise<User>,
  get(user: User): Promise<User>,
  fetch(): Promise<User[]>,
  delete(id: number): Promise<boolean>,
  update(user: User): Promise<User>
}

@injectable()
class UserRepository implements IUserRepository {
  public async get(user: User): Promise<User> {
    return await User.findOne(user, { relations: ['roles'] });
  }

  public async fetch(): Promise<User[]> {
    return await User.find();
  }

  public async delete(id: number): Promise<boolean> {
    const deleteResult = await User.delete({ id });

    return deleteResult.affected >= 1 ? true : false;
  }

  public async create(email: string, password: string): Promise<User> {
    const newUser = User.create({ email, password });
    return await User.save(newUser);
  }

  public async update(user: User): Promise<User> {
    const updatedUser = User.create(user);
    await User.save(updatedUser);

    return await User.findOne({ id: user.id });
  }
}

export default UserRepository;