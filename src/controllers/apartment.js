import { Apartment } from "../models";
class ApartmentController {
  static async create(req, res, next) {
    try {
      const created = await Apartment.create(req.body);
      if (!created) throw new Error("server failed to responf");
      return res.json({
        data: created,
        errors: null,
        message: "apartment has been posted successfully",
      });
    } catch (err) {
      console.error(err);
      return next({
        status: 500,
        error: [err],
        message: "failed to post apartment",
      });
    }
  }

  static async findOne(req, res, next) {
    try {
      const apartment = await Apartment.findById(req.params.id);
      if (!apartment) return next();
      res.json({
        data: apartment,
        errors: null,
        message: "apartment found",
      });
    } catch (err) {
      console.log(err);
      next();
    }
  }

  static async search(req, res, next) {
    console.log(req.query);
  }
}

export default ApartmentController;
