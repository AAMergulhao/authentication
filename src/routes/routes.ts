import { Router } from "express";

import tokenVerifyMiddleware from "../middlewares/tokenVerify";

import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import RoleController from "../controllers/RoleController";

const authController = new AuthController();
const userController = new UserController();
const roleController = new RoleController();

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

router.get("/role/", tokenVerifyMiddleware, roleController.fetch);
router.post("/role/", tokenVerifyMiddleware, roleController.create);
router.delete("/role/:id", tokenVerifyMiddleware, roleController.delete);
router.get("/role/:id", tokenVerifyMiddleware, roleController.get);

export default router;
