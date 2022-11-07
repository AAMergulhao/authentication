import User from "@entity/User";
import { IUserService } from "./UserService";

import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@repositories/UserRepository";
interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface DecodedToken extends User {
  iat: number;
  exp: number;
}

function getTokens(user: User): Tokens {
  try {
    const accessToken = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRATION) * 60 });

    const refreshToken = jwt.sign({ ...user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRATION) * 60 });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }

}

export async function hashPassword(password: string): Promise<string> {
  await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT_ROUNDS)).then((hash) => {
    password = hash;
  }).catch(error => { throw new Error(error.message) });

  return password;
}

export interface IAuthService {
  signUp(email: string, password: string): Promise<boolean>,
  signIn(email: string, password: string): Promise<Tokens>,
  refresh(refreshToken: string): Promise<Tokens>,
  verify(accessToken: string): DecodedToken
}
@injectable()
class AuthService implements IAuthService {

  constructor(@inject('UserService') private userService: IUserService, @inject('UserRepository') private userRepository: IUserRepository) {
  }

  public async signUp(email: string, password: string): Promise<boolean> {
    try {
      if (await this.userRepository.get({ email } as User)) {
        throw new Error("There is already a user with this e-mail.");
      }

      password = await hashPassword(password);

      await this.userService.create(email, password);

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async signIn(email: string, password: string): Promise<Tokens> {
    try {

      const storedUser = await this.userRepository.get({ email } as User);

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

  public async refresh(refreshToken: string): Promise<Tokens> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as DecodedToken;

      if (!decoded) {
        throw new Error("Token invalid.");
      }
      const user = await this.userService.getByEmailAndPassword(decoded.email, decoded.password);

      return getTokens(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public verify(accessToken: string): DecodedToken {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as DecodedToken;

      if (!decoded) {
        throw new Error("Token invalid.");
      }

      return decoded;
    } catch (error) {
      throw { status: 401, message: error.message };
    }
  }
}

export default AuthService;
