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
apiRouter.post("/image", (req, res) => {
  console.log(req.files);
});
apiRouter.use("/auth", verifyForeignUser, authRoutes); //done
apiRouter.use("/user", userRoutes); //5done, 1 not needed, 6totals
apiRouter.use("/apartment", apartmentRoutes); //3 done, 1test. 1issue 5total

//pending fe works in total are 2;
export default apiRouter;
