const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { SECRET_KEY } = process.env;

exports.hashPassword = password => new Promise((resolve,reject) => {
  bcrypt.hash(password,10)
  .then(hash => resolve(hash))
  .catch(err => reject('Error '+err))
})


exports.generateToken = user => {
  jwt.sign( { id: user._id }, SECRET_KEY,
  { algorithm: 'RS256', 
  expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30) }, //TOKEN EXPIRES AFTER 30 DAYS
  (err,token) => {
    console.log(err, token)
    return { err, token }
  }) 
}

