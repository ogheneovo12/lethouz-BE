import { Router } from "express";
import UsersController from "../controllers/user";
import {
  updateProfileValidator,
  passwordResetValidator,
} from "../middlewares/validateInputs";

const userRouter = Router();

// get user details
userRouter.get("/", UsersController.showUser); //done

//update profile
userRouter.put("/", updateProfileValidator, UsersController.update); //nil //no ui

//reset password
userRouter.put(
  "/password",
  passwordResetValidator,
  UsersController.updatePassword
); //done

//get saved apartments
userRouter.get("/saved", UsersController.getSaved); //done

// save/unsave apartment
userRouter.put("/saved", UsersController.toggleSaved); //done

//get user apartments
userRouter.get("/apartment", UsersController.getApartments); //done

export default userRouter;
