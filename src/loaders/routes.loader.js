import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectStore from "connect-mongo";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import apiRoutes from "../routes";
import * as config from "../config";
const MongoStore = connectStore(session);

/**
 * Registers all api routes with the express app.
 * @param  {object} config an exoress app instalce
 * @return {Promise} return resolved promise
 */

export default function loadRoutes(app, c) {
  return new Promise((resolve, reject) => {
    // cors and body parser setup
    app.use(
      cors({
        credentials: true,
        origin:
          process.env.NODE_ENV == "development"
            ? "http://localhost:3000"
            : "https://lethouz.netlify.app",
      })
    );
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // session configuration
    app.use(
      session({
        name: config.sessionName,
        secret: config.secretKey,
        saveUninitialized: false,
        resave: false,
        cookie: {
          domain: "lethouz.netlify.app",
          sameSite: true,
          secure: false, //process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24, // set to 2 hours
        },
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: "sessions",
        }),
      })
    );

    app.use(cookieParser());
    app.use((req, res, next) => {
      console.log("cookies", req.cookies);
      next();
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/api", apiRoutes);

    // error handling routes
    app.use((req, res, next) => {
      next({
        status: 404,
        errors: {
          request: "requested resource not found",
        },
        message: "Bad Reuest",
      });
    });

    app.use(({ status, errors, message }, req, res, next) => {
      console.log(errors);
      res.status(status || 500).json({
        data: null,
        errors,
        message,
      });
    });

    // resolve promise
    resolve();
  });
}
