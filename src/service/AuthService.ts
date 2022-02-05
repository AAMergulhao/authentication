import User, { UserI } from "../entity/User";

import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";

interface Auth {
  accessToken: string;
  refreshToken: string;
}
class AuthService {
  public async signUp(email: string, password: string): Promise<boolean> {
    try {
      if (await getRepository(User).findOne({ email })) {
        throw new Error("There is already a user with this e-mail.");
      }

      bcrypt.hash(
        password,
        parseInt(process.env.PASSWORD_SALT_ROUNDS),
        (error, hash) => {
          if (error) {
            throw new Error(error.message);
          }
          password = hash;
        }
      );

      await User.save({ email, password } as User);

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AuthService;
