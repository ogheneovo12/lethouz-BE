import { Router } from "express";
import * as check  from "../middlewares";
import AuthController from "../controllers/auth";

const router = Router();

router.post('/register',check.registerValidator, check.verifyNewUser, AuthController.registerUser);

router.post('/login',check.loginValidator, check.verifyOldUser, AuthController.loginUser);

export default router;