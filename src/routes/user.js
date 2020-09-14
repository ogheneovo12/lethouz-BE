import { Router } from "express";
import UsersController from "../controllers/user";
import { updateProfileValidator } from "../middlewares/validateInputs";

const userRouter = Router();

// get user details
userRouter.get("/", UsersController.showUser);

//get saved apartments
userRouter.get("/saved", UsersController.getSaved);

//update profile
userRouter.put("/", updateProfileValidator, UsersController.update);

// save/unsave apartment
userRouter.put("/saved", UsersController.toggleSaved);

//get user apartments
userRouter.get("/apartment", UsersController.getApartments);

//

export default userRouter;
