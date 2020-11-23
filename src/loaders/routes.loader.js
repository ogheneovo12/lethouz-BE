import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectStore from "connect-mongo";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import apiRoutes from "../routes";
import * as config from "../config";
import { join } from "path";
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
        origin: (origin, callback) => {
          if ("http://localhost:3000" == origin) {
            callback(null, true);
          } else {
            callback(new Error("Not Allowed by CORS"));
          }
        },
      })
    );

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // serve static files for react app
    app.use(app.express.static(join(process.cwd(), "client/build")));

    // session handling
    app.use(
      session({
        name: config.sessionName,
        secret: config.secretKey,
        saveUninitialized: false,
        resave: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24, // set to 24 hours
        },
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: "sessions",
        }),
      })
    );
    app.use(cookieParser());
    //app.use((req, res, next) => console.log(req.session, req.cookies));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/api", apiRoutes);
    app.get("/*", (req, res, next) => {
      // redirect to 404 handler if not xhr request
      if (req.xhr) return next();
      return res.sendFile(join(process.cwd(), "client/build/index.html"));
    });

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
      //console.log(errors);
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
