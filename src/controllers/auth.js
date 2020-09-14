import { User } from "../models";
import { hashPassword, verifyPassword, createError } from "../utils/utils";

export default class AuthController {
  static registerUser(req, res, next) {
    Promise.resolve()
      .then(createNewUser)
      .then(genPasswordHash)
      .then(attachPasswordHash)
      .then(saveUserDetails)
<<<<<<< HEAD
      .then(sendToken)
      .catch(next);
=======
      .then(sendCookie)
      .catch(() =>
        next({
          status: 500,
          errors: { request: "server failed to respond :(" },
          message: "registration failed",
        })
      );
>>>>>>> f14a6d93db07c66921f76ff958a14dcce0069226

    function createNewUser() {
      const { firstName, lastName, email } = req.body;
      return {
        firstName,
        lastName,
        email,
      };
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
      return User.create(user);
    }

    function sendCookie(user) {
      req.session.user = user._id;
      let data = { ...user._doc };
      delete data.password;

      res.send({
        data,
        errors: null,
        message: "registration success",
      });
    }
  }

  static loginUser(req, res, next) {
    Promise.resolve()
      .then(getDbCredentials)
      .then(comparePassword)
      .then(endOnPasswordMismatch)
      .then(sendResponse)
      .catch((request) => {
        next({
          data: null,
          errors: { request },
          message: "login failed",
        });
      });

    function getDbCredentials() {
      return User.findOne({ email: req.body.email }).select("+password");
    }

    function comparePassword(user) {
      if (!user) return Promise.reject("invalid login credentials");
      return Promise.all([
        verifyPassword(req.body.password, user.password),
        Promise.resolve(user),
      ]);
    }

    function endOnPasswordMismatch([status, user]) {
<<<<<<< HEAD
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
=======
      if (!status) return Promise.reject("invalid login credentials");
      return Promise.resolve(email);
    }

    function sendResponse(user) {
      req.session.user = user._id;
      let data = { ...user._doc };
      delete data.password;
      res.json({
        data,
        errors: null,
        message: "You have successfully logged in",
>>>>>>> f14a6d93db07c66921f76ff958a14dcce0069226
      });
    }
  }
}
