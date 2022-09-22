import User from "../entity/User";
import UserService from "./UserService";

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

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }

}

async function hashPassword(password: string): Promise<string> {
  await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT_ROUNDS)).then((hash) => {
    password = hash;
  }).catch(error => { throw new Error(error.message) });

  return password;
}

class AuthService {
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async signUp(email: string, password: string): Promise<boolean> {
    try {
      if (await getRepository(User).findOne({ email })) {
        throw new Error("There is already a user with this e-mail.");
      }

      password = await hashPassword(password);

      const newUser = await this.userService.create(email, password);

      await this.userService.addRole(newUser.id, 2);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async signIn(email: string, password: string): Promise<Auth> {
    try {

      const storedUser = await User.findOne({ email });

      if (!storedUser) {
        throw new Error("Email and password does not match.");
      }

      await bcrypt.compare(password, storedUser.password).then((isValid) => {
        if (!isValid) {
          throw new Error("Email and password does not match.");
        }
      });

      return getTokens(storedUser);
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

  public verify(accessToken: string): any {
    try {
      const isTokenValid: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      return isTokenValid;
    } catch (error) {
      throw { status: 401, message: error.message };
    }
  }
}

export default AuthService;
