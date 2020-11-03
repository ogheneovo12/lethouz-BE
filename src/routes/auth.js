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
); //done

authRouter.post(
  "/login",
  loginValidator,
  verifyOldUser,
  AuthController.loginUser
); //done

// oAuth for Google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
); //done

authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.send(req.user);
  }
);

// oAuth for Facebook
authRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: "email" })
);//done

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

authRouter.get("/logout", AuthController.logout); //done

export default authRouter;
