import { Router } from "express";
import ApartmentController from "../controllers/apartment";

import {
  createApartmentValidator,
  updateApartmentValidator,
  verifySeller,
  searchQueryBuilder,
  verifyUser,
  getCoordinates,
} from "../middlewares";
const apartmentRouter = Router();

apartmentRouter.post(
  "/",
  verifyUser,
  createApartmentValidator,
  getCoordinates,
  verifySeller,
  ApartmentController.create
); //done
apartmentRouter.get("/", searchQueryBuilder, ApartmentController.search);
apartmentRouter.get("/featured", ApartmentController.getAll); //done
apartmentRouter.get("/:id", ApartmentController.findOne); //done
apartmentRouter.put(
  "/:id",
  verifyUser,
  updateApartmentValidator,
  ApartmentController.update
); //need final testing
export default apartmentRouter;
