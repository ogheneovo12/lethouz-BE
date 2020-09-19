import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import cloudinaryStorage from "multer-storage-cloudinary";
import { cloudinary as options } from "../config";

cloudinary.config(options);
const storage = cloudinaryStorage({
  cloudinary,
  folder: "uploads",
  allowedFormats: ["jpg", "jpeg", "png"],
  transformation: [{ width: 400, height: 400, crop: "crop" }],
});

export default multer({ storage });
