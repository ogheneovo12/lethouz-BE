//IMPORT MOODULES
import validator from "validator";
import isEmpty from "is-empty";
import joi from "joi";
import types from "../seeders/dropdowns";
import { formatJoiError } from "../utils/utils";

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
  console.log("in validator");
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
    errors.request = "Invalid login credentials";
  }
  if (validator.isEmpty(data.password)) {
    errors.request = "invalid login credentials";
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
  if (!isEmpty(errors))
    return next({ status: 400, errors, message: "profile update failed" });
  req.body = sanitize(data);
  next();
}

const createApartmentSchema = joi.object().keys({
  title: joi.string().required(),
  type: joi
    .string()
    .required()
    .valid(
      ...[
        ...types["coworking space"],
        ...types.house,
        ...types.commercial,
        ...types.land,
        ...types.apartment,
      ]
    ),
  price: joi.number().required(),
  purpose: joi.string().required().valid(),
  currency: joi.string().required(),
  currentState: joi.string().required().valid("new", "furnished", "serviced"),
  description: joi.string().required(),
  details: joi.object().keys({
    bathrooms: joi.number().required(),
    toilets: joi.number().required(),
    bedrooms: joi.number().required(),
    size: joi.number().required(),
  }),
  address: joi.object().keys({
    address: joi.string().required(),
    state: joi.string().required(),
    lga: joi.string().required(),
    country: joi.string().required(),
  }),
  attachments: joi.array(),
});

export async function createApartmentValidator(req, res, next) {
  try {
    req.body = await createApartmentSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body.geometry = {};
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    next({
      status: 400,
      errors,
      message: "validation failed",
    });
  }
}

export function passwordResetValidator(req, res, next) {
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

const updateApartmentSchema = joi.object().keys({
  title: joi.string(),
  type: joi
    .string()
    .required()
    .valid(
      ...[
        ...types["coworking space"],
        ...types.house,
        ...types.commercial,
        ...types.land,
        ...types.apartment,
      ]
    ),
  price: joi.number(),
  purpose: joi.string().valid(),
  currency: joi.string(),
  currentState: joi.string().valid("new", "furnished", "serviced"),
  description: joi.string(),
  details: joi.object().keys({
    bathrooms: joi.number(),
    toilets: joi.number(),
    bedrooms: joi.number(),
    size: joi.number(),
  }),
  address: joi.object().keys({
    address: joi.string(),
    state: joi.string(),
    lga: joi.string(),
    country: joi.string(),
  }),
  attachments: joi.array(),
  published:joi.bool(),
  draft:joi.number(),
  sold:joi.bool()
});

export async function updateApartmentValidator(req, res, next) {
  try {
    req.body = await updateApartmentSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body.geometry = {};
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    next({
      status: 400,
      errors,
      message: "validation failed",
    });
  }
}

function sanitize(data) {
  for (const prop in data) {
    data[prop] = validator.escape(data[prop]);
  }
  return data;
}
