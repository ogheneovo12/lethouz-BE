import { Router } from "express";
import authRoutes from "./auth";
import { verifyForeignUser } from "../middlewares";

const apiRouter = Router();

// welcome route
apiRouter.get("/", (req, res) => {
  console.log(req.session);
  res.json({
    mesage: "welcome to the api route",
  });
});

apiRouter.use("/auth", verifyForeignUser, authRoutes);

export default apiRouter;
