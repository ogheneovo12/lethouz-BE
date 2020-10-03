import { Router } from "express";
import ApartmentController from "../controllers/apartment";

import {
  createApartmentValidator,
  updateApartmentValidator,
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
);
apartmentRouter.get("/", searchQueryBuilder, ApartmentController.search);
apartmentRouter.get("/featured", ApartmentController.getAll);
apartmentRouter.get("/:id", ApartmentController.findOne);
apartmentRouter.put(
  "/:id",
  updateApartmentValidator,
  //getCoordinates,
  ApartmentController.update
);
export default apartmentRouter;
