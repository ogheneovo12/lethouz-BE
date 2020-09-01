import passport from "passport";
import { Strategy } from "passport-google-oauth20";

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
          console.log(profile);
        }
      )
    );
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
      console.log(id, done);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    resolve();
  });
}
