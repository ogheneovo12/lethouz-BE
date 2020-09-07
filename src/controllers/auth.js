import { User } from "../models";
import {
  hashPassword,
  sessionizeUser,
  verifyPassword,
  createError,
} from "../utils/utils";

export default class AuthController {
  static registerUser(req, res, next) {
    Promise.resolve()
      .then(createNewUser)
      .then(genPasswordHash)
      .then(attachPasswordHash)
      .then(saveUserDetails)
      .then(sendToken)
      .catch(() =>
        next([500, ["server failed to process request"], "server failure :( "])
      );

    function createNewUser() {
      const { firstName, lastName, email } = req.body;
      return new User({
        firstName,
        lastName,
        email,
      });
    }

    function genPasswordHash(user) {
      return Promise.all([
        Promise.resolve(user),
        hashPassword(req.body.password),
      ]);
    }

    function attachPasswordHash([user, hash]) {
      user.password = hash;
      return user;
    }

    function saveUserDetails(user) {
      return Promise.all([
        user.save(),
        sessionizeUser({
          email: user.email,
        }),
      ]);
    }

    function sendToken([_, session]) {
      req.session.email = session.email;
      res.send({
        data: {},
        errors: null,
        message: "user has successfully registered",
      });
    }
  }

  static loginUser(req, res, next) {
    Promise.resolve()
      .then(getDbCredentials)
      .then(comparePassword)
      .then(endOnPasswordMismatch)
      .then(sendResponse)
      .catch(next);

    function getDbCredentials() {
      return User.findOne({ email: req.body.email });
    }

    function comparePassword(user) {
      return Promise.all([
        verifyPassword(req.body.password, user.password),
        Promise.resolve(user.email),
      ]);
    }

    function endOnPasswordMismatch([status, email]) {
      if (!status) {
        throw createError(400, "Incorrect Password");
      }
      return email;
    }

    function sendResponse(email) {
      req.session.email = email;
      res.status(200).json({
        message: "You have successfully logged in",
      });
    }
  }
}
