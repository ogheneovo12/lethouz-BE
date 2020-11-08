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

function sanitize(data) {
  for (const prop in data) {
    data[prop] = validator.escape(data[prop]);
  }
  return data;
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

export function updateApartmentValidator(req, res, next) {
  const { body } = req;
  const errors = {};
  const data = {};

  data.title = !isEmpty(body.title) ? body.title : "";
  data.purpose = !isEmpty(body.purpose) ? body.purpose : "";
  data.type = !isEmpty(body.type) ? body.type : "";
  data.price = !isEmpty(body.price) ? String(body.price) : "";
  data.currentState = !isEmpty(body.currentState) ? body.currentState : "";
  data.description = !isEmpty(body.description) ? body.description : "";
  for (const prop in data) {
    if (!data[prop] || data[prop] == "") delete data[prop];
  }
  if (data.tile) {
    if (validator.isEmpty(data.title)) {
      errors.title = "Invalid title";
    }
  }
  if (data.price) {
    if (validator.isEmpty(data.price) || !validator.isInt(data.price)) {
      errors.price = "Invalid price";
    }
  }

  if (data.currentState) {
    if (validator.isEmpty(data.currentState)) {
      errors.currentState = "current state required";
    } else {
      if (
        data.currentState != "new" &&
        data.currentState != "furnished" &&
        data.currentState != "serviced"
      )
        errors.currentState = "invalid current state";
    }
  }

  if (data.purpose) {
    if (validator.isEmpty(data.purpose) || !validator.isAlpha(data.purpose)) {
      errors.purpose = "Invalid purpose";
    }
  }
  if (data.type) {
    if (validator.isEmpty(data.type) || !validator.isAlpha(data.type)) {
      errors.type = "Invalid type";
    }
  }
  let others = { ...data };
  data.attachments = body.attachments;
  if (data.attachments && !Array.isArray(data.attachments)) {
    errors.attachments = "invald format";
    delete data.attachments;
  }
  if (body.details) {
    let details = {};
    details.bedrooms = body.details.bedrooms;
    details.bathrooms = body.details.bathrooms;
    details.toilets = body.details.toilets;
    details.size = body.details.size;
    for (const prop in details) {
      if (details[prop]) {
        if (!validator.isInt(String(details[prop]))) {
          errors.details = "invalid number of " + prop;
          delete details[prop];
        }
      } else {
        delete details[prop];
      }
    }
    if (!isEmpty(details)) {
      data.details = details;
    }
  }
  if (body.address) {
    let address = {};
    address.lga = body.address.lga;
    address.state = body.address.state;
    address.address = body.address.address;
    for (const prop in address) {
      if (!address[prop]) {
        delete address[prop];
      }
    }
    if (!isEmpty(address)) {
      data.address = address;
    }
  }
  if (!isEmpty(errors))
    return next({ status: 400, errors, message: "failed to update apartment" });
  others = sanitize({ ...others });
  req.body = { ...others };
  if (data.attachments) {
    req.body.attachments = data.attachments;
  }
  if (data.details) {
    data.details = sanitize(data.details);
    req.body.details = data.details;
  }
  if (data.address) {
    data.address = sanitize(data.address);
    req.body.address = data.address;
  }
  if (req.body.address) {
    req.body.geometry = {};
  }
  next();
}
