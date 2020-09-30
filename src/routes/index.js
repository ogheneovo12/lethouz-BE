import { Router } from "express";
import authRoutes from "./auth";
import apartmentRoutes from "./apartment";
import userRoutes from "./user";
import { verifyForeignUser, verifyUser } from "../middlewares";
const apiRouter = Router();
// welcome route
apiRouter.get("/", (req, res) => {
  res.json({
    mesage: "welcome to the api route",
  });
});
apiRouter.post("/image", (req, res) => {
  console.log(req.files);
});
apiRouter.use("/auth", verifyForeignUser, authRoutes);
apiRouter.use("/user", verifyUser, userRoutes);
apiRouter.use("/apartment", verifyUser, apartmentRoutes);

export default apiRouter;
