import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models";

export default function loader(app, config) {
  return new Promise((resolve) => {
    passport.use(
      new Strategy(
        {
          clientID: config.googleID,
          clientSecret: config.googleSecret,
          callbackURL: "/api/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
          // steps [ extract user and arrange user, check if user exists, if user doesn't exist create user, send done]
          Promise.resolve()
            .then(extractDetails)
            .then(checkIfUserExists)
            .then(createIfNotExists)
            .send(sendResponse)
            .catch((err) => done(err, null));

          function extractDetails() {
            const person = profile._json;
            const details = {
              firstName: person.given_name,
              lastName: person.family_name,
              email: person.email,
              profileImage: person.picture,
            };
            return Promise.resolve(details);
          }
          function checkIfUserExists(user) {
            console.log("send 1 response");
            return Promise.all([
              User.find({ email: user.email }),
              Promise.resolve(user),
            ]);
          }
          function createIfNotExists([exists, user]) {
            console.log("send 2 response");
            if (exists) return Promise.resolve(user);

            return User.create(user);
          }
          function sendResponse(user) {
            console.log("send 3 response");
            return done(null, user);
          }
        }
      )
    );
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
      console.log(id, done);
    });

    resolve();
  });
}

function extractUserFromPayload(params) {
  return;
}
