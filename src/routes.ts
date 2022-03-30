import { Router } from "express";

import tokenVerifyMiddleware from "./middleware/tokenVerify";

import AuthController from "./controller/AuthController";
import UserController from "./controller/UserController";

const authController = new AuthController();
const userController = new UserController();

const router = Router();

router.post("/auth/signUp", authController.signUp);
router.post("/auth/signIn", authController.signIn);
router.get("/auth/refresh", authController.refresh);
router.get("/auth/verify", authController.verify);

router.get("/user/", tokenVerifyMiddleware, userController.get);

export default router;
