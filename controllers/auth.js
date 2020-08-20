import { User } from '../models';
import { hashPassword, sessionizeUser } from '../utils/utils';

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
      const {firstName, lastName, email} = req.body;
      return new User({
        firstName,
        lastName,
        email
      });
    }

    function genPasswordHash(user) {
      return Promise.all([
        Promise.resolve(user),
       hashPassword(req.body.password)
      ]);
    }

    function attachPasswordHash([user, hash]) {
      user.password = hash;
      return user
    }

    function saveUserDetails(user) {
      return Promise.all([
        user.save(),
        sessionizeUser({
          email : user.email
        })
      ])
    }


    function sendToken([r,session]) {
      req.session.email = session.email
      res.send({
        message: 'user has successfully registered'
      });
    } 
  }

  static loginUser(req, res, next) {
    Promise.resolve()
      .then(getDbCredentials)
      //.then(comparePassword)
      // .then(sendResponse)
      // .then(endOnPasswordMismatch)
      .catch(next)

    function getDbCredentials() {
      return User.findOne({email: req.body.email})
    }

    function comparePassword(user) {
      return
    }


    function sendResponse(token) {
      res.status(200).json({
        status: 200,
        message: 'Admin logged in',
        data: [{ token }]
      });
    }
  }
}