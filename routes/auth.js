import { Router } from "express";
import * as _  from "../middlewares";
import AuthController from "../controllers/auth";

const router = Router();

router.post('/register',_.registerValidator, _.verifyNewUser, AuthController.registerUser);

router.post('/login',_.loginValidator, _.verifyOldUser, AuthController.loginUser);

export default router;