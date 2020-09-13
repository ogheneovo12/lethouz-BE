import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models";

export default function loader(app, config) {
  return new Promise((resolve) => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.googleID,
          clientSecret: config.googleSecret,
          callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const oldUser = await User.findOne({
              email: profile.emails[0].value,
            });
            if (oldUser) return done(null, oldUser);
            const newUser = await User.create({
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              profileImage: profile.photos[0].value,
            });
            if (newUser) return done(null, newUser);
          } catch (err) {
            console.log("access token: ", accessToken);
          }
        }
      )
    );
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
        done(null, user);
      });
    });
    resolve();
  });
}
