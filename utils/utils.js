const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
import { secretKey } from "../config"



export function createError(status, message){
  return {
    status,
    message: new Error(message)
  }
} 

export function hashPassword(string){
  return bcrypt.hash(string, 10)
}

export function sessionizeUser({ email }) {
  return Promise.resolve( { email } );
}


