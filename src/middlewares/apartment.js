import opencage from "opencage-api-client";
import validator from "validator";
import empty from "is-empty";
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
    });
}

export function searchQueryBuilder(req, res, next) {
  const errors = {};
  const query = {};
  let { lat, lng, price, current_state, type, radius } = req.query;
  //validate latitude and longitude
  if ((!lat && lng) || (lat && !lng)) {
    errors.coordinates =
      "invalid coordinates: latitude must have a corresponding longitude";
  } else {
    if (!validator.isFloat(lat) || !validator.isFloat(lng)) {
      errors.coordinates = "invalid latitude/longitude ";
    } else {
      query.lat = lat;
      query.lng = lng;
      query.coordinates = true;
    }
  }

  // validate price
  if (price) {
    if (validator.isInt(String(price))) {
      query.price = price;
    } else {
      errors.price = "invalid amount";
    }
  }
  // validate current_state
  if (current_state) {
    if (
      current_state == "new" ||
      current_state == "furnished" ||
      current_state == "serviced"
    ) {
      query.current_state = current_state;
    } else {
      errors.current_state = "invalid house state specified";
    }
  }

  if (radius) {
    if (Number(radius) <= 30) {
      query.radius = 30;
    } else {
      query.radius = radius;
    }
  } else {
    query.radius = 30;
  }

  if (type) {
    query.type = type;
  }
  if (!empty(errors))
    return res.status(400).json({
      data: null,
      errors,
      message: "failed perform search",
    });
  req.query = query;
  next();
}

export function checkOwnerOfApartment(req, res, next) {
  try {
  } catch (err) {
    return next({
      status: 404,
      errors: {
        apartment: "invalid apartment id",
      },
      message: "failed to save/unsave apartment",
    });
  }
}
