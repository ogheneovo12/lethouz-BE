import { Router } from "express";
import * as _ from "../middlewares";
import AuthController from "../controllers/auth";
import passport from "passport";

const authRouter = Router();

// Traditional registration
authRouter.post(
  "/register",
  _.registerValidator,
  _.verifyNewUser,
  AuthController.registerUser
);

authRouter.post(
  "/login",
  _.loginValidator,
  _.verifyOldUser,
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
    res.send(req.user);
  }
);

// // logout route
// authRouter.post("/logout", (req, res) => {
//   req.session.destroy();
//   res.send({
//     message: "you're now logged out",
//   });
// });

// // failed
// authRouter.get("/failed", (req, res) => {
//   res.json({
//     message: "Authentication Fail",
//   });
// });

// // dummy markup for test
// authRouter.get("/login", (req, res) => {
//   res.send(`
//     <form action="/api/auth/login" method="POST">
//       <input type="email" name="email" placeholder="email" required>
//       <input type="password" name="password" placeholder="password" required>
//       <input type="submit" value="Submit">
//     </form>
//   `);
// });

authRouter.get("/register", (req, res) => {
  res.send(`
    <form action="/api/auth/register" method="POST"> <br />
      <input name="firstName" placeholder="first name" required> <br />
      <input name="lastName" placeholder="last name" required> <br />
      <input type="email" name="email" placeholder="email" required> <br />
      <input type="password" name="password" placeholder="password" required> <br />
      <input name="confirmPassword" type="password" placeholder="password" required>
      <input type="submit" value="Submit">
    </form>
  `);
});

export default authRouter;
