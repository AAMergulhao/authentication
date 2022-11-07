import { Router } from "express";

import tokenVerifyMiddleware from "@middlewares/tokenVerify";
import roleVerifyMiddleware from "@middlewares/roleVerify";

import AuthController from "@controllers/AuthController";
import UserController from "@controllers/UserController";
import RoleController from "@controllers/RoleController";

import container from "@config/container";

const authController: AuthController = container.resolve('AuthController');
const userController: UserController = container.resolve('UserController');
const roleController: RoleController = container.resolve('RoleController');

const router = Router();

router.post("/auth/signUp", authController.signUp);
router.post("/auth/signIn", authController.signIn);
router.get("/auth/refresh", authController.refresh);
router.get("/auth/verify", authController.verify);

router.get("/user/", tokenVerifyMiddleware, userController.get);
router.put("/user/", tokenVerifyMiddleware, userController.update);
router.delete("/user/", tokenVerifyMiddleware, userController.delete);
router.post("/user/role", tokenVerifyMiddleware, userController.addRole);
router.delete("/user/role", tokenVerifyMiddleware, userController.removeRole);

router.get("/role/", tokenVerifyMiddleware, roleVerifyMiddleware(['ADMIN']), roleController.fetch);
router.post("/role/", tokenVerifyMiddleware, roleVerifyMiddleware(['ADMIN']), roleController.create);
router.delete("/role/:id", tokenVerifyMiddleware, roleVerifyMiddleware(['ADMIN']), roleController.delete);
router.get("/role/:id", tokenVerifyMiddleware, roleVerifyMiddleware(['ADMIN']), roleController.get);

export default router;
