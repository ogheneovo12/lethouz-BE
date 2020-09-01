import { Router } from "express";
import * as _ from "../middlewares";
import AuthController from "../controllers/auth";
import passport from "passport";

const router = Router();

// Traditional registration
router.post(
  "/register",
  _.registerValidator,
  _.verifyNewUser,
  AuthController.registerUser
);

router.post(
  "/login",
  _.loginValidator,
  _.verifyOldUser,
  AuthController.loginUser
);

// OAuth for Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "localhost:5000/api/auth/failed",
  }),
  (req, res) => {
    res.redirect("/api");
  }
);

export default router;
