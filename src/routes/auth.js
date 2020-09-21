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

// oAuth for Google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

// oAuth for Facebook
authRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

authRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.send(req.user);
  }
);

// oAuth for Facebook
authRouter.get(
  "/twitter",
  passport.authenticate("twitter", { scope: "email" })
);

authRouter.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  (req, res) => {
    res.send(req.user);
  }
);

authRouter.get("/logout", AuthController.logout);

export default authRouter;
