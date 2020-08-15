const bcrypt =  require('bcryptjs');
require('dotenv').config();

const {SECRET_KEY} = process.env;

module.exports = function (secret) {
  bcrypt.hash(secret).then(res => res)
}
