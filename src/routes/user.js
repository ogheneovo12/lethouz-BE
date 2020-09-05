import { Router } from "express";
import * as _ from "../middlewares";
import userController from "../controllers/user";
import passport, { use } from "passport";

const userRouter = Router();

// get user details
userRouter.get("/", userController.show);

// get saved apartments
userRouter.get("/saved", userController.getSavedItems);

// save/unsave apartment
userRouter.post("/saved", userController.toggleSaved);

//get user apartments
userRouter.get("/apartment", userController.getApartments);

//

export default userRouter;
