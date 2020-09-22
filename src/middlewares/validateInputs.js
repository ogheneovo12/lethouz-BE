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
  const data = {};

  data.firstName = !isEmpty(req.body.firstName) ? req.body.firstName : "";
  data.lastName = !isEmpty(req.body.lastName) ? req.body.lastName : "";
  data.email = !isEmpty(req.body.email) ? req.body.email : "";
  data.password = !isEmpty(req.body.password) ? req.body.password : "";
  data.confirmPassword = !isEmpty(req.body.confirmPassword)
    ? req.body.confirmPassword
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

  data.email = !isEmpty(req.body.email) ? req.body.email : "";
  data.password = !isEmpty(req.body.password) ? req.body.password : "";

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "Invalid login credentials";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "invalid login credentials";
  }
  if (!isEmpty(errors))
    return next({ status: 400, errors, message: "login failed" });
  req.body = sanitize(data);
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

export function createApartmentValidator(req, res, next) {
  const { body } = req;
  const errors = {};
  const data = {};

  data.title = !isEmpty(body.title) ? body.title : "";
  data.purpose = !isEmpty(body.purpose) ? body.purpose : "";
  data.type = !isEmpty(body.type) ? body.type : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Invalid title";
  }
  if (validator.isEmpty(data.purpose) || !validator.isAlpha(data.purpose)) {
    errors.purpose = "Invalid purpose";
  }
  if (validator.isEmpty(data.type) || !validator.isAlpha(data.type)) {
    errors.type = "Invalid type";
  }
  if (!body.details) {
    errors.details = "house details required";
  } else {
    const invalid = [
      body.details.bedrooms,
      body.details.bathrooms,
      body.details.toilets,
      body.details.size,
    ].some((prop) => prop == "" || !validator.isInt(prop));
    if (invalid) {
      errors.details = "invalid house details";
    } else {
      const { bedrooms, bathrooms, toilets, size } = body.details;
      data.details = { bedrooms, bathrooms, toilets, size };
    }
  }
  if (!body.address) {
    errors.address = "house address required";
  } else {
    const invalid = [
      body.address.lga,
      body.address.state,
      body.address.address,
    ].some((prop) => validator.isEmpty(prop));
    if (invalid) {
      errors.address = "invalid house location";
    } else {
      const { lga, state, address } = body.address;
      data.address = { lga, state, address };
    }
  }
  if (!isEmpty(errors))
    return next({ status: 400, errors, message: "create apartment" });
  data.details = sanitize(data.details);
  data.address = sanitize(data.address);
  const others = sanitize({
    title: data.title,
    purpose: data.purpose,
    type: data.type,
  });
  req.body = { ...others, details: data.details, address: data.address };
  req.body.geometry = {};
  next();
}

function sanitize(data) {
  for (const prop in data) {
    data[prop] = validator.escape(data[prop]);
  }
  return data;
}

export function passwordResetValidator(req, res, next) {
  const errors = {};
  const data = {};
  data.currentPassword = req.body.currentPassword
    ? req.body.currentPassword
    : "";
  data.newPassword = req.body.newPassword ? req.body.newPassword : "";
  data.confirmPassword = req.body.confirmPassword
    ? req.body.confirmPassword
    : "";
  if (isEmpty(data.newPassword) || data.newPassword != data.confirmPassword) {
    return next({
      status: 400,
      errors: {
        password:
          "new password and confirm password must be equal non empty values",
      },
      message: "failed to reset password",
    });
  }
  req.body = sanitize(data);
  next();
}
