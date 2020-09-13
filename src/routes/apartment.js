import { Router } from "express";
import ApartmentController from "../controllers/apartment";
import { Apartment } from "../models";
const apartmentRouter = Router();

apartmentRouter.post("/", ApartmentController.create);

apartmentRouter.get("/", ApartmentController.search);

apartmentRouter.get("/:id", ApartmentController.findOne);

export default apartmentRouter;
