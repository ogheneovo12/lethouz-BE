import { Apartment } from "../models";
class ApartmentController {
  static async create(req, res, next) {
    let errors, message;
    if (req.body.published) {
      errors = null;
      message = "apartment has been successfully listed";
    } else {
      errors = {};
      errors.user = "Account not verified..no user profile video found";
      message = "apartment listing saved to drafts";
    }
    try {
      req.body.posted_by = req.session.user;
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
    try {
      // console.log(req.query);
      // const query = await Apartment.find({
      //   location: {
      //     $near: {
      //       $maxDistance: 1000,
      //       $geometry: {
      //         type: "Point",
      //         lat: 6.6018,
      //         lng: 3.3515,
      //       },
      //     },
      //   },
      // });
      console.log(query);
      // query.$where(function () {
      //   Math.abs(this.location.lat - req.query.lat) <= 20;
      // });
      // const apartments = await query.exec();
      // console.log(apartments);
      // const apartments = await Apartment.find({
      //   $where: function () {
      //     Math.abs(this.location.lat - req.query.lat) <= 20;
      //   },
      // });
      console.log(apartments);
    } catch (err) {
      console.error(err);
    }
  }
}

export default ApartmentController;
