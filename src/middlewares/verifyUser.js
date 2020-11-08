import { User } from "../models";

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

export async function verifySeller(req, res, next) {
  try {
    req.body.published = await User.exists({
      _id: req.session.user,
      isSeller: 1,
    });
    next();
  } catch (err) {
    next({
      status: 500,
      errors: {
        request: "server failed to respond",
      },
      message: "request failed",
    });
  }
}
