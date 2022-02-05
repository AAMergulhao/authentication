import { Router } from "express";

import AuthController from "./controller/AuthController";

const authController = new AuthController();

const router = Router();

router.post("/auth/signUp", authController.signUp);

export default router;
