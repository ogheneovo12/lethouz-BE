import { Router } from "express";
import UsersController from "../controllers/user";
import {
  updateProfileValidator,
  passwordResetValidator,
  verifyUser,
} from "../middlewares";

const userRouter = Router();

// get user details
userRouter.get("/", verifyUser, UsersController.showUser); //done

//update profile
userRouter.put("/", verifyUser, updateProfileValidator, UsersController.update); //nil //no ui

//reset password
userRouter.put(
  "/password",
  verifyUser,
  passwordResetValidator,
  UsersController.updatePassword
); //done

//get saved apartments
userRouter.get("/saved", verifyUser, UsersController.getSaved); //done

// save/unsave apartment
userRouter.put("/saved", verifyUser, UsersController.toggleSaved); //done

//get user apartments
userRouter.get("/apartment", verifyUser, UsersController.getApartments); //done

// get user details for guests
userRouter.get("/:username", UsersController.findOne);

// get user aoartments for guests
userRouter.get("/:username/apartment", UsersController.getUserApartments);

export default userRouter;
