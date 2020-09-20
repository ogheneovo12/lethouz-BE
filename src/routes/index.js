import { Router } from "express";
// import cloudinary from "cloudinary";
// import fileUpload from "multer";
import authRoutes from "./auth";
import apartmentRoutes from "./apartment";
import userRoutes from "./user";
import { verifyForeignUser, verifyUser } from "../middlewares";
import parser from "../cloudinary/setup";
const apiRouter = Router();
// welcome route
apiRouter.get("/", (req, res) => {
  res.json({
    mesage: "welcome to the api route",
  });
});
// apiRouter.use((req, res, next) => {
//   console.log(req.session);
// });
apiRouter.post("/image", parser.array("profile", 5), (req, res) => {
  console.log(req.files);
});
apiRouter.use("/auth", verifyForeignUser, authRoutes);
apiRouter.use("/user", verifyUser, userRoutes);
apiRouter.use("/apartment", verifyUser, apartmentRoutes);

export default apiRouter;
