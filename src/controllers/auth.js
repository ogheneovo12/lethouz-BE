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
      .catch(next);

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
        Promise.resolve(user),
      ]);
    }

    function endOnPasswordMismatch([status, user]) {
      if (!status) {
        throw createError(400, "Incorrect Password");
      }
      return user;
    }

    function sendResponse(user) {
      req.session.email = user.email;
      res.status(200).json({
         errors:null,
         data:user,
         message: "You have successfully logged in",
      });
    }
  }
}
