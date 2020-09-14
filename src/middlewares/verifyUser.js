import { User } from "../models";
import { createError } from "../utils/utils";

export async function verifyNewUser(req, res, next) {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists)
      return next({
        status: 400,
        errors: { email: "email already exists" },
        message: "registration failed",
      });
    next();
  } catch (err) {
    return next({
      status: 500,
      errors: { request: "server failed to respond :(" },
      message: "registration failed",
    });
  }
}

export async function verifyOldUser(req, res, next) {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (!exists)
      return next({
        status: 400,
        errors: { request: "invalid login credentials" },
        message: "login failed",
      });
    next();
  } catch (err) {
    return next({
      status: 500,
      errors: { request: "server failed to respond :(" },
      message: "login failed",
    });
  }
}
