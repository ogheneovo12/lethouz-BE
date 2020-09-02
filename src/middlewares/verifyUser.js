import { User } from "../models";
import { createError } from "../utils/utils";

export function verifyNewUser(req, res, next) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return next(
        createError(500, "Oops ! server failed to resond, please try again")
      );

    if (user)
      return next(createError(400, `email ${req.body.email} already exists`));

    next();
  });
}

export function verifyOldUser(req, res, next) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return next(
        createError(500, "Oops ! server failed to resond, please try again")
      );

    if (user) return next();

    next(createError(400, `email ${req.body.email} not found`));
  });
}
