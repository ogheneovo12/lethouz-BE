const opencage = require("opencage-api-client");
export default function getCoordinates(req, res, next) {
  opencage
    .geocode({ q: req.body.location.lga + "," + req.body.location.state })
    .then((data) => {
      console.log(data);
      const results = data.results.map((r) => r.geometry);
      req.body.location.lat = results[0].lat;
      req.body.location.lng = results[0].lng;
      next();
    })
    .catch((error) => {
      console.log("error", error.message);
      next(error)
    });
}
