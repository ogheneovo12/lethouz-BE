import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
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
            console.log(err)
            console.log("access token: ", accessToken);
          }
        }
      )
    );
    passport.use(
      new FacebookStrategy(
        {
          ...config.facebook,
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
              profileImage: profile.photos ? profile.photos[0].value : "",
            });
            if (newUser) return done(null, newUser);
          } catch (err) {
            console.log(err);
            console.log("access token: ", accessToken);
          }
        }
      )
    );

    // passport.use(
    //   new TwitterStrategy(
    //     {
    //       ...config.twitter,
    //     },
    //     async (accessToken, refreshToken, profile, done) => {
    //       console.log(profile);
    //     }
    //   )
    // );

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
