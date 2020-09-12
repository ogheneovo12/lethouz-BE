import { User } from "../models";
import { createError } from "../utils/utils";

export function verifyNewUser(req, res, next) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return next({
        status: 500,
        errors: ["server failed to respond :( "],
        message: "registration failed",
      });

    if (user)
      return next({
        status: 400,
        errors: ["email already exists"],
        message: "registration failed",
      });

    next();
  });
}

export function verifyOldUser(req, res, next) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return next({
        status: 500,
        errors: ["server failed to respond :("],
        message: "authentication failed",
      });

    if (user) return next();

    return next({
      status: 400,
      errors: ["invalid login credentials"],
      message: "authentication failed",
    });
  });
}
