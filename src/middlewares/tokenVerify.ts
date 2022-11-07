import { Response, NextFunction } from "express";

import CustomRequest from "@utils/CustomRequest";

import { IAuthService } from '@services/AuthService';

import container from '@config/container';

function tokenVerify(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const accessToken: string = req.headers['authorization'] as string;

    if (!accessToken || accessToken.trim() === "") {
      return res.status(401).json({
        message: "AccessToken cannot be null or empty.",
      });
    }

    const authService: IAuthService = container.resolve('AuthService');

    const decodedToken = authService.verify(accessToken);
    req.id = decodedToken.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
}

export default tokenVerify;