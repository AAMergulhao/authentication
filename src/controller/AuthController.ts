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
}

export default AuthController;
