const JWTStrategy = require('passport-jwt').Strategy;
const Strategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User } = require('../models');
const passport = require('passport');

//load .env contents
require('dotenv').config();
const secretOrKey = process.env.SECRET_KEY;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey
}
const strategy = new Strategy(options,(payload,done)=> {
  console.log(payload);
  console.log(done);
})

module.exports = passport => {
  passport.use(strategy);
}
