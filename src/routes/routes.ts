import { Router } from "express";

import tokenVerifyMiddleware from "../middleware/tokenVerify";

import AuthController from "../controller/AuthController";
import UserController from "../controller/UserController";
import RoleController from "../controller/RoleController";

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

router.get("/role/", roleController.fetch);
router.post("/role/", roleController.create);
router.delete("/role/:id", roleController.delete);
router.get("/role/:id", roleController.get);

export default router;
