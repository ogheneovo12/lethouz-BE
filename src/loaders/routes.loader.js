import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectStore from "connect-mongo";
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
    app.use(cors());
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
          sameSite: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 7,
        },
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: "sessions",
        }),
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    // M
    app.use("/api", apiRoutes);

    // error handling routes
    app.use((req, res, next) => {
      next({
        status: 404,
        message: "requested resource not found",
      });
    });

    app.use(({ status, message }, req, res, next) => {
      res.status(status).json({ message });
    });

    // resolve promise
    resolve();
  });
}
