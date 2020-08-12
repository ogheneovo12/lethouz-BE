const {registerValidator,loginValidator} = require('./validateInputs');
const verifyNewUser = require('./verifyNewUser')

module.exports = {
  registerValidator,
  loginValidator,
  verifyNewUser
};
