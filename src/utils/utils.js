import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function createError(status, message) {
  return [status, errors, message];
}

export function hashPassword(string) {
  return bcrypt.hash(string, 10);
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function formatJoiError({ details }) {
  const errors = {};
  for (let { message } of details) {
    message = message.split('"').splice(1);
    if (message[0].split(".").length > 1) {
      let [obj, prop] = message[0].split(".");
      if (!errors[obj]) errors[obj] = {};
      errors[obj][prop] = prop + message[1];
    } else {
      errors[message[0]] = message.join();
    }
  }
  return Object.values(errors).length == 0 ? null : errors;
}
