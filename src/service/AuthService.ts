import User, { UserI } from "../entity/User";

import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface Auth {
  accessToken: string;
  refreshToken: string;
}

function getTokens(user: User): Auth {
  try {
    const accessToken = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION) * 60 });

    const refreshToken = jwt.sign({ ...user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRATION) * 60 });

    return { accessToken, refreshToken }
  } catch (error) {
    throw new Error(error.message);
  }

}

function hashPassword(password: string): string {
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
  return password;
}
class AuthService {
  public async signUp(email: string, password: string): Promise<boolean> {
    try {
      if (await getRepository(User).findOne({ email })) {
        throw new Error("There is already a user with this e-mail.");
      }

      password = hashPassword(password);

      await User.save({ email, password } as User);

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async signIn(email: string, password: string): Promise<Auth> {
    try {

      password = hashPassword(password);

      const user = await User.findOne({ email, password });
      if (!user.hasId()) {
        throw new Error("Email and password does not match.");
      }

      return getTokens(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async refresh(refreshToken: string): Promise<Auth> {
    try {
      const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      if (!decoded) {
        throw new Error("Token invalid.");
      }
      const user = await User.findOne({ email: decoded.email, password: decoded.password });

      return getTokens(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async verify(accessToken: string): Promise<boolean> {
    try {
      const isTokenValid: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      return isTokenValid ? true : false;
    } catch (error) {
      throw { status: 401, message: error.message };
    }
  }
}

export default AuthService;
