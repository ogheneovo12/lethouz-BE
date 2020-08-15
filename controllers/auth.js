const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { hashPassword, generateToken} = require('../helpers/utils.js');

// hash password -> save user -> generate token -> send token
exports.signupUser = (req,res) => {
  const {firstName,lastName,email,password} = req.body;

  hashPassword(password).then( hash => {
    const newUser = new User({ firstName, lastName, email, password: hash });

    newUser.save()
      .then(user => {
        console.log(generateToken(user));
      })
      .catch( err => res.status(500).json({
        err,
        SERVER_ERROR: 'failed to save user'
      }))
  })
  .catch( err => console.log(err))
}