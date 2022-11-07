import { Response } from "express";

import CustomRequest from "@utils/CustomRequest";

import { IUserService } from "@services/UserService";
import { inject, injectable } from "tsyringe";

@injectable()
class UserController {

  constructor(@inject('UserService') private userService: IUserService) { }

  public get = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const user = await this.userService.get(req.id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  public update = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const user = await this.userService.update({ id: req.id, ...req.body });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  public delete = async (req: CustomRequest, res: Response): Promise<Response> => {
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

  public addRole = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const { userId, roleId } = req.body;

      if (!userId || !roleId) {
        throw new Error("User id and Role id cannot be null or empty.");
      }

      const user = await this.userService.addRole(userId, roleId);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  public removeRole = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
      const { userId, roleId } = req.body;

      if (!userId || !roleId) {
        throw new Error("User id and Role id cannot be null or empty.");
      }

      const user = await this.userService.removeRole(userId, roleId);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}

export default UserController;
