import { User, Apartment } from "../models";
import { hashPassword, verifyPassword } from "../utils/utils";
class UsersController {
  static async showUser(req, res, next) {
    try {
      const data = await User.findById(req.session.user).populate(
        "savedApartments"
      );
      if (!data)
        return next({
          status: 400,
          errors: { request: "invalid user" },
          message: "unable to find user",
        });

      return res.json({
        data,
        errors: null,
        message: "user details found !!",
      });
    } catch (errors) {
      return next({
        status: 500,
        errors: { request: "server failed to respond" },
        message: "unable to find user",
      });
    }
  }

  static async update(req, res, next) {
    try {
      const user = await User.findByIdAndUpdate(req.session.user, req.body, {
        useFindAndModify: false,
      });
      return res.json({
        data: user,
        errors: null,
        message: "user details have been updated !!",
      });
    } catch (errors) {
      return next({
        status: 500,
        errors: { request: "server failed to respond" },
        message: "unable to find user",
      });
    }
  }

  static async updatePassword(req, res, next) {
    try {
      const user = await User.findById(req.session.user).select("+password");
      if (user.password) {
        const correctPassword = await verifyPassword(
          req.body.currentPassword,
          user.password
        );
        if (!correctPassword)
          return next({
            status: 400,
            errors: {
              password: "incorect current password",
            },
          });
      }
      const newHash = await hashPassword(req.body.newPassword);
      user.password = newHash;
      if (await user.save())
        res.send({
          data: user,
          errors: null,
          message: "password has been changed successfully",
        });
    } catch (error) {
      console.log(error);
      return next({
        status: 500,
        errors: {
          request: "server failed to respond",
        },
        message: "update password failure",
      });
    }
  }

  static async getSaved(req, res, next) {
    try {
      const { savedApartments } = await User.findById(req.session.user)
        .populate("savedApartments")
        .select("savedApartments");
      return res.json({
        data: savedApartments,
        errors: null,
        message: "user's saved apartments found",
      });
    } catch (errors) {
      console.log(errors);
      return next({
        status: 500,
        errors: { request: "server failed to respond" },
        message: "unable to find user's saved apartment",
      });
    }
  }

  static async toggleSaved(req, res, next) {
    const id = req.body.apartment;
    let message = "apartment has been added to saved apartments";
    try {
      const user = await User.findById(req.session.user);
      const index = [...user.savedApartments].findIndex((a) => a == id);
      if (index == -1) {
        user.savedApartments.push(id);
      } else {
        message = "apartment has been removed from saved apartments";
        user.savedApartments.splice(index, 1);
      }
      await user.save();
      const apartment = await User.findById(req.session.user)
        .select("savedApartments")
        .populate("savedApartments");
      return res.json({
        data: apartment,
        errors: null,
        message,
      });
    } catch (errors) {
      console.log(errors);
      return next({
        status: 500,
        errors: { request: "server failed to respond" },
        message: "unable to update saved apartments",
      });
    }
  }

  static async getApartments(req, res, next) {
    try {
      const apartments = await Apartment.find({ posted_by: req.session.user });

      return res.json({
        data: apartments,
        errors: null,
        message: "user's uploaded apartments found",
      });
    } catch (errors) {
      console.log(errors);
      return next({
        status: 500,
        errors: { request: "server failed to respond" },
        message: "unable to find user's uploaded apartments",
      });
    }
  }
}

export default UsersController;