import { Router } from "express";
import ApartmentController from "../controllers/apartment";

import {
  createApartmentValidator,
  verifySeller,
  getCoordinates,
} from "../middlewares";
const apartmentRouter = Router();

apartmentRouter.post(
  "/",
  createApartmentValidator,
  getCoordinates
  // verifySeller,
  // ApartmentController.create
);
apartmentRouter.get("/", ApartmentController.search);
//apartmentRouter.get("/featured",ApartmentController.getFeatured)
apartmentRouter.get("/:id", ApartmentController.findOne);
export default apartmentRouter;
