import { Apartment } from "../models";
class ApartmentController {
  static async create(req, res, next) {
    let errors, message;
    if (req.body.published) {
      errors = null;
      message = "apartment has been successfully listed";
    } else {
      errors = {};
      errors.user = "Account not verified... no user profile video found";
      message = "apartment listing saved to drafts";
    }
    try {
      req.body.posted_by = req.session.user;
      req.body.geometry.type = "Point";
      const created = await Apartment.create(req.body);
      if (!created) throw new Error("server failed to respond");
      return res.json({
        data: created,
        errors,
        message,
      });
    } catch (err) {
      console.error(err);
      return next({
        status: 500,
        errorr: {
          apartment: err,
        },
        message: "failed to post apartment",
      });
    }
  }

  static async findOne(req, res, next) {
    try {
      const apartment = await Apartment.findById(req.params.id).populate(
        "posted_by",
        "firstName lastName email"
      );
      if (!apartment) throw new Error("invalid apartment id");
      res.json({
        data: apartment,
        errors: null,
        message: "apartment found",
      });
    } catch (err) {
      next({
        status: 404,
        errors: { apartment: err },
        message: "apartment not found",
      });
    }
  }

  static async search(req, res, next) {
    let { lat, lng, price, state, type, radius, coordinates } = req.query;
    const query = { sold: false };
    const queryOptions = [];
    if (coordinates) {
      query.geometry = {
        $within: { $centerSphere: [[lng, lat], radius / 6371] },
      };
    }
    if (price) {
      queryOptions.push({
        price: {
          $lte: price,
        },
      });
    }
    if (state) {
      queryOptions.push({ state });
    }
    if (type) {
      queryOptions.push({ type });
    }
    if (queryOptions.length) {
      query["$or"] = queryOptions;
    }
    try {
      const apartments = await Apartment.find(query).populate(
        "posted_by",
        "firstName lastName email username"
      );
      res.json({
        data: apartments,
        errors: null,
        message: "apartments found",
      });
    } catch (err) {
      console.error(err);
      next({
        status: 500,
        errors: { request: "failed to perform search" },
        message: "apartments not found",
      });
    }
  }

  static async update(req, res, next) {
    try {
      const apartment = await Apartment.findById(req.params.id);
      for (const prop in req.body) {
        if (!(req.body[prop] instanceof Object) || prop == "attachments") {
          apartment[prop] = req.body[prop];
        } else {
          for (const n in req.body[prop]) {
            apartment[prop][n] = req.body[prop][n];
          }
        }
      }
      if (await apartment.save()) {
        return res.json({
          data: apartment,
          errors: null,
          message: "apartment details have been updated",
        });
      }
    } catch (err) {
      console.error(err);
      next({
        status: 400,
        errors: {
          apartment: err.message,
        },
        message: "failed to update apartment",
      });
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await Apartment.find({ published: 1 });
      res.send({
        data: data,
        errors: null,
        message: "list of featured apartment retireved",
      });
    } catch (err) {
      next({
        status: 500,
        errors: {
          request: "serve failed to respond :(",
        },
        message: "failed to retrieve featured apartments",
      });
    }
  }
}

export default ApartmentController;
