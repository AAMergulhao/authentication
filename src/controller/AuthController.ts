import { Request, Response } from "express";

import AuthService from "../service/AuthService";
class AuthController {
  public authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public signUp = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      await this.authService.signUp(email, password);

      return res.json({
        message: "User successfully created.",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  public signIn = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(400).json({
          message: "Email and password cannot be null or empty.",
        });

      }
      const auth = await this.authService.signIn(email, password);

      return res.json(auth);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  public refresh = async (req: Request, res: Response): Promise<Response> => {
    try {
      const refreshToken: string = req.headers['authorization'] as string;



      if (!refreshToken || refreshToken.trim() === "") {
        return res.status(400).json({
          message: "RefreshToken cannot be null or empty.",
        });

      }
      const auth = await this.authService.refresh(refreshToken);

      return res.json(auth);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}

export default AuthController;
