import opencage from "opencage-api-client";
import axios from "axios";
import validator from "validator";
import empty from "is-empty";
import { Apartment } from "../models/index";

export async function getCoordinates(req, res, next) {
  try {
    const result = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: `${req.body.address.address},${req.body.address.state}`,
          key: process.env.GOOGLE_GEOAPI_KEY,
        },
      }
    );
    const geometry = Object.values(
      result.data.results[0].geometry.location
    ).reverse();
    console.log(result.data.results[0].geometry.location);
    req.body.geometry.coordinates = geometry;
    next();
  } catch (err) {
    console.log(err.mesage);
    next({
      status: 500,
      errors: {
        request: err.message,
      },
      message: "failed to fetch coordinates",
    });
  }
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

export async function checkOwnerOfApartment(req, res, next) {
  try {
    const owner = await Apartment.findById(req.body.apartment).select(
      "posted_by"
    );
    if (owner == req.session.user)
      return next({
        status: 400,
        errors: {
          apartment: "you cannot save an aprtment you own",
        },
        message: "failed to save an apartment",
      });
    return next();
  } catch (err) {
    return next({
      status: 404,
      errors: {
        apartment: "invalid apartment id",
      },
      message: "failed to save apartment",
    });
  }
}
