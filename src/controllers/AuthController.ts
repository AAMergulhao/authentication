import { Response } from "express";

import CustomRequest from "@utils/CustomRequest";

import { IAuthService } from "@services/AuthService";
import { inject, injectable } from "tsyringe";

@injectable()
class AuthController {
  constructor(@inject('AuthService') private authService: IAuthService) {
  }

  public signUp = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      await this.authService.signUp(email, password);

      return res.status(200).json({
        message: "User successfully created.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  public signIn = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(400).json({
          message: "Email and password cannot be null or empty.",
        });

      }
      const auth = await this.authService.signIn(email, password);

      return res.status(200).json(auth);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  public refresh = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const refreshToken: string = req.headers['authorization'] as string;

      if (!refreshToken || refreshToken.trim() === "") {
        return res.status(400).json({
          message: "RefreshToken cannot be null or empty.",
        });

      }
      const auth = await this.authService.refresh(refreshToken);

      return res.status(200).json(auth);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  public verify = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const accessToken: string = req.headers['authorization'] as string;

      if (!accessToken || accessToken.trim() === "") {
        return res.status(400).json({
          message: "AccessToken cannot be null or empty.",
        });
      }
      const isTokenValid = await this.authService.verify(accessToken);

      if (!isTokenValid) {
        return res.status(401).json({
          message: "Token invalid."
        });
      }

      return res.status(200).json({
        message: "Token valid."
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message,
      });
    }
  };
}

export default AuthController;
