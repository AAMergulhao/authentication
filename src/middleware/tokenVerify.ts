import { Request, Response, NextFunction } from "express";

import AuthService from '../service/AuthService';

function tokenVerify(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken: string = req.headers['authorization'] as string;

        if (!accessToken || accessToken.trim() === "") {
            return res.status(401).json({
                message: "AccessToken cannot be null or empty.",
            })
        }

        const authService = new AuthService();

        const decodedToken = authService.verify(accessToken);
        req.email = decodedToken.email;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
}

export default tokenVerify;