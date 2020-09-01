import * as config from "../config";
import express from "express";
import dbConnect from "./db.connect";
import routeLoader from "./routes";
import passportLoader from "./passport";
const app = express();

/**
 * @desc Loads all resources needed for the full funtioning of the app
 * Loads Db connection
 * Loads Routes
 */
const loadAll = (app) =>
  Promise.all([
    dbConnect(app, config),
    routeLoader(app, config),
    passportLoader(app, config),
  ]).then(() => console.log("resources have been loaded"));

app.loadAll = loadAll;

export default app;
