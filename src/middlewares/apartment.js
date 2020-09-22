const opencage = require("opencage-api-client");
export default function getCoordinates(req, res, next) {
  opencage
    .geocode({ q: req.body.address.lga + "," + req.body.address.state })
    .then((data) => {
      const results = data.results.map((r) => r.geometry);
      req.body.geometry.coordinates = [results[0].lng, results[0].lat];
      next();
    })
    .catch((error) => {
      console.log("error", error.message);
      next(error)
    });
}
