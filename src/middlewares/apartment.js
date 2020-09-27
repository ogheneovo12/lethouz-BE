const opencage = require("opencage-api-client");
export function getCoordinates(req, res, next) {
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

export function searchQueryBuilder(req, res, next) {
  console.log(req.query);
}
