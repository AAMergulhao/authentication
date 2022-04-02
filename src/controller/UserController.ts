import { Request, Response } from "express";

import UserService from "../service/UserService";
class UserController {
    public userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public get = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await this.userService.get(req.id);

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    };

    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = await this.userService.update({ id: req.id, ...req.body });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    };

    public delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const successfullyDeleted = await this.userService.delete(req.id);

            if (!successfullyDeleted) {
                throw new Error("Error while deleting user.");
            }

            return res.status(200).json({
                message: 'User successfully deleted.'
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    };
}

export default UserController;
