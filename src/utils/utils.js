const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { secretKey } from "../config";

export function createError(status, message) {
  return [status, errors, message];
}

export function hashPassword(string) {
  return bcrypt.hash(string, 10);
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

