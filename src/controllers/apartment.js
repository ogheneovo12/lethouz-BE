import { Apartment } from "../models";
class ApartmentController {
  static async create(req, res, next) {
    try {
      const created = await Apartment.create(req.body);
      if (!created) throw new Error("server failed to respond");
      return res.json({
        data: created,
        errors: null,
        message: "apartment has been posted successfully",
      });
    } catch (err) {
      // console.error(err);
      return next({
        status: 500,
        error: {
          apartment: err,
        },
        message: "failed to post apartment",
      });
    }
  }

  static async findOne(req, res, next) {
    try {
      const apartment = await Apartment.findById(req.params.id);
      if (!apartment) throw new Error("invalid apartment if");
      res.json({
        data: apartment,
        errors: null,
        message: "apartment found",
      });
    } catch (err) {
      // console.log(err);
      next([400, { apartment: err }, "apartment not found"]);
    }
  }

  static async search(req, res, next) {
    console.log(req.query);
  }
}

export default ApartmentController;
