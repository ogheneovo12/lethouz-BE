import { Router } from "express";
import ApartmentController from "../controllers/apartment";

import {
  createApartmentValidator,
  verifySeller,
  searchQueryBuilder,
  getCoordinates,
} from "../middlewares";
const apartmentRouter = Router();

apartmentRouter.post(
  "/",
  createApartmentValidator,
  getCoordinates,
  verifySeller,
  ApartmentController.create
);//done
apartmentRouter.get("/", searchQueryBuilder, ApartmentController.search); //halfway, server issue
apartmentRouter.get("/featured", ApartmentController.getAll); //done
apartmentRouter.get("/:id", ApartmentController.findOne); //done
apartmentRouter.put(
  "/:id",
  createApartmentValidator,
  //getCoordinates,
  ApartmentController.update
);  //need final testing
export default apartmentRouter;
