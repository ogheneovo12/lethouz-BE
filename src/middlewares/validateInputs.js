//IMPORT MOODULES
const validator = require("validator");
const isEmpty = require("is-empty");

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @desc validates user inputs. sends errors and stops current endpoint work if any.
 */

export function registerValidator(req, res, next) {
  const errors = {};
  const data = req.body;

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  // VALIDATION RULES
  if (validator.isEmpty(data.firstName) || !validator.isAlpha(data.lastName)) {
    errors.firstName = "First name is an alphabet only required field";
  }

  if (validator.isEmpty(data.lastName) || !validator.isAlpha(data.lastName)) {
    errors.lastName = "Last name is an alphabet only required field";
  }

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "Incorrect Email";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }

  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.passwordLength = "Password must be at least 8 characters";
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.passwordsMismatch = "Passwords must match";
  }

  if (!isEmpty(errors))
    return next({ status: 400, errors, message: "registration failed" });
  next();
}

export function loginValidator(req, res, next) {
  const errors = {};
  const data = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "Invalid login credentials";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "invalid login credentials";
  }

  if (!isEmpty(errors))
    return next({ status: 400, errors, message: "login failed" });
  next();
}

export function updateProfileValidator(req, res, next) {
  const errors = {};
  const data = {};

  data.firstName = !isEmpty(req.body.firstName) ? req.body.firstName : "";
  data.lastName = !isEmpty(req.body.lastName) ? req.body.lastName : "";
  data.profileImage = !isEmpty(req.body.profileImage)
    ? req.body.profileImage
    : "";
  data.profileVideo = !isEmpty(req.body.profleVideo)
    ? req.body.profileVideo
    : "";
  if (validator.isEmpty(data.firstName) || !validator.isAlpha(data.firstName)) {
    errors.firstName = "Invalid first name";
  }
  if (validator.isEmpty(data.lastName) || !validator.isAlpha(data.lastName)) {
    errors.lastName = "invalid last name";
  }
  // if (validator.isEmpty(data.profileImage)) {
  //   errors.photo = "profile photo required";
  // }
  if (!isEmpty(errors))
    return next({ status: 400, errors, message: "profile update failed" });
  req.body = sanitize(data);
  next();
}

function sanitize(data) {
  for (const prop in data) {
    data[prop] = validator.escape(data[prop]);
  }
  return data;
}
