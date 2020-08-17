import cors from "cors";
import bodyParser from "body-parser";
import allRoutes from "../routes";


/**
 * Registers all api routes with the express app.
 * @param  {object} config an exoress app instalce
 * @return {Promise}
 */

export default function loadRoutes(app, config) {
  return new Promise((resolve, reject) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use("/api",allRoutes)

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