const opencage = require("opencage-api-client");
export default function getCoordinates(req, res, next) {
  opencage
    .geocode({ q: req.body.location.lga + "," + req.body.location.state })
    .then((data) => {
      const results = data.results.map((r) => r.geometry);
      console.log("here");
      console.log(req.body);
      // req.body.address.lat = results[0].lat;
      // req.body.location.lng = results[0].lng;
      //next();
    })
    .catch((error) => {
      console.log("error", error.message);
    });
}
