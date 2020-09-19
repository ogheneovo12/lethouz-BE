import { Router } from "express";
import authRoutes from "./auth";
import apartmentRoutes from "./apartment";
import userRoutes from "./user";
import { verifyForeignUser } from "../middlewares";

const apiRouter = Router();

// welcome route
apiRouter.get("/", (req, res) => {
  res.json({
    mesage: "welcome to the api route",
  });
});

apiRouter.use("/auth", verifyForeignUser, authRoutes);
apiRouter.use("/user", userRoutes);
apiRouter.use("/apartment", apartmentRoutes);

export default apiRouter;
