import { Router } from "express";

import AuthController from "./controller/AuthController";

const authController = new AuthController();

const router = Router();

router.post("/auth/signUp", authController.signUp);
router.post("/auth/signIn", authController.signIn);
router.get("/auth/refresh", authController.refresh);

export default router;
