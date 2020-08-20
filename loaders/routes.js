import cors from "cors";
import session from "express-session";
import connectStore from "connect-mongo";
import bodyParser from "body-parser";
import mongoose from  "mongoose";
import allRoutes from "../routes";
import * as config from "../config";

const MongoStore = connectStore(session);

/**
 * Registers all api routes with the express app.
 * @param  {object} config an exoress app instalce
 * @return {Promise} return resolved promise
 */

export default function loadRoutes(app, c) {
  return new Promise((resolve, reject) => {
    
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(session({
      name: config.sessionName,
      secret: config.secretKey,
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions',
      }),
      cookie: {
        sameSite: true,
        secure: process.env.NODE_ENV === 'production' ,
        maxAge: 1000 * 60 * 60 * 7
      }
    }))

    app.use("/api",allRoutes);

    // error handling routes
    app.use((req, res, next) => {
      res.status(404).send('route not found');
     })

    app.use((error,req, res, next) => {
    console.error(error.stack);
    res.status(error.status).send(error.message);
    })

    resolve();
  });
}