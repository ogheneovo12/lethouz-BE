import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth";

import {
  registerValidator,
  loginValidator,
  verifyNewUser,
  verifyOldUser,
} from "../middlewares";
const authRouter = Router();

// Traditional registration
authRouter.post(
  "/register",
  registerValidator,
  verifyNewUser,
  AuthController.registerUser
);

authRouter.post(
  "/login",
  loginValidator,
  verifyOldUser,
  AuthController.loginUser
);

// OAuth for Google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http:localhost:3000");
  }
);

authRouter.post("/logout", AuthController.logout);

export default authRouter;
