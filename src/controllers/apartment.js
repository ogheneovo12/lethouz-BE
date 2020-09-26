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
    const {
      lat,
      lng,
      maxPrice,
      minPrice,
      state,
      type,
      radius = 20,
    } = req.query;
    try {
      const apartments = await Apartment.find({
        $or: [
          {
            geometry: {
              $within: { $centerSphere: [[lng, lat], radius / 6371] },
            },
          },
          {
            price: {
              $lte: maxPrice,
              $gte: minPrice,
            },
          },
          { state },
          { type },
        ],
        sold: false,
      }).populate("posted_by", "firstName lastName email");
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
      const update = await Apartment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.send({
        data: update,
        errors: null,
        message: "apartment details have been updated successfully",
      });
    } catch (err) {
      next({
        status: 400,
        errors: {
          request: "invalid details provided",
        },
        message: "  failed to update apartment details",
      });
    }
  }
}

export default ApartmentController;

// const { lat, lng, minPrice, maxPrice, radius = 30000 } = req.query;
// console.log(radius);
// try {
//   const apartments = await Apartment.aggregate().near({
//     near: {
//       type: "Point",
//       coordinates: [lng, lat],
//     },
//     maxDistance: Number(radius),
//     spherical: true,
//     distanceField: "dist.calculated",
//   });
//   res.json({
//     data: apartments,
//     errors: null,
//     message: "apartments found",
//   });
// } catch (err) {
//   console.error(err);
// }

//  static async LocationFirst(lat, lng, radius) {
//     const apartments = await Apartment.aggregate().near({
//       near: {
//         type: "Point",
//         coordinates: [parseFloat(lng), parseFloat(lat)],
//       },
//       maxDistance: parseFloat(radius),
//       spherical: true,
//       distanceField: "dist.calculated",
//     });
//   }
