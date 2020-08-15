const bcrypt = require('bcryptjs');

const { User } = require('../models');
const hashFunction = require('../utils/passwordHash.js');

exports.signupUser = (req,res) => {
  let {firstName,lastName,email,password} = req.body;

  password = hashFunction(password);
  console.log(password);

  // const user = new User({
  //   firstName,
  //   lastName,
  //   email,
  //   password
  // })

  res.send('user');
  

}