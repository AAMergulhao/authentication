import { Response, NextFunction } from "express";

import CustomRequest from "@utils/CustomRequest";

import { IUserService } from "@services/UserService";

import container from "@config/container";

function roleVerify(requiredRoles: string[]) {
  const userService: IUserService = container.resolve('UserService');
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = await userService.get(req.id);

    for (const role of user.roles) {
      if (requiredRoles.includes(role.name)) {
        return next();
      }
    }

    return res.status(401).json({
      message: 'User does not have the required roles to access this service.'
    });
  };
}

export default roleVerify;