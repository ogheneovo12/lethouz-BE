const {registerValidator,loginValidator} = require('./validateInputs');

module.exports = {
  verifyNewUser: require('./verifyNewUser'),
  registerValidator,
  loginValidator
}