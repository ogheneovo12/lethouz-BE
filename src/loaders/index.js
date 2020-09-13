import express from "express";
import dbConnect from "./db.loader";
import routeLoader from "./routes.loader";
import passportLoader from "./passport.loader";
import * as config from "../config";
const app = express();

/**
 * @desc Loads all resources needed for the full funtioning of the app
 * Loads Db connection
 * Loads Routes
 */
const loadAll = (app) =>
  Promise.all([dbConnect(app, config), routeLoader(app, config)])
    .then(() => console.log(`resources have been loaded`));

app.loadAll = loadAll;

export default app;
