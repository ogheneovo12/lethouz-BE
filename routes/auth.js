import { Router } from "express";
import {registerValidator, loginValidator, verifyNewUser}  from "../middlewares";
import AuthController from "../controllers/auth";

const router = Router();

router.post('/register',registerValidator, verifyNewUser, AuthController.registerUser);

router.post('/login',loginValidator);

export default router;