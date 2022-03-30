import { Request, Response } from "express";

import UserService from "../service/UserService";
class UserController {
    public userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public get = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await this.userService.get(req.email);

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    };
}

export default UserController;
