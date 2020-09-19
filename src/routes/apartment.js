import { Router } from "express";
import ApartmentController from "../controllers/apartment";

import { createApartmentValidator } from "../middlewares/validateInputs";
const apartmentRouter = Router();

apartmentRouter.post(
  "/",
  //verifySeller,
  createApartmentValidator,
  ApartmentController.create
);

apartmentRouter.get("/", ApartmentController.search);

apartmentRouter.get("/:id", ApartmentController.findOne);

export default apartmentRouter;
