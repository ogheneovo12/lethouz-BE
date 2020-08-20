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

  // static loginAdmin(req, res, next) {
  //   getAdmin()
  //     .then(checkIfAdminExists)
  //     .then(comparePassword)
  //     .then(abortIfPasswordMismatch)
  //     .then(generateAdminToken)
  //     .then(sendResponse)
  //     .catch(next);

  //   function getAdmin() {
  //     return Admin.findOne({
  //       username: req.body.username
  //     });
  //   }

  //   function checkIfAdminExists(admin) {
  //     if (!admin) 
  //       throw createError(404, 'Account was not found');
  //     return admin;
  //   }

  //   function comparePassword(admin) {
  //     return Promise.all([
  //       Promise.resolve(admin),
  //       bcrypt.compare(req.body.password, admin.password)
  //     ]);
  //   }

  //   function abortIfPasswordMismatch([admin, status]) {
  //     if (!status)
  //       throw createError(403, 'The password doesn\'t match');
  //     return admin;
  //   }

  //   function generateAdminToken(admin) {
  //     return generateJwtToken({
  //       id: admin._id,
  //     }, '7d');
  //   }

  //   function sendResponse(token) {
  //     res.status(200).json({
  //       status: 200,
  //       message: 'Admin logged in',
  //       data: [{ token }]
  //     });
  //   }
  // }
}