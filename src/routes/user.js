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
userRouter.put("/", updateProfileValidator, UsersController.update); 

//reset password
userRouter.put(
  "/password",
  passwordResetValidator,
  UsersController.updatePassword
);

//get saved apartments
userRouter.get("/saved", UsersController.getSaved); //nil

// save/unsave apartment
userRouter.put("/saved", UsersController.toggleSaved); //nill

//get user apartments
userRouter.get("/apartment", UsersController.getApartments); //done

export default userRouter;
