import { config } from "dotenv";

config();

const {
  SECRET_KEY,
  MONGO_URI,
  SESSION_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = process.env;

export const port = process.env.PORT || 9000;

export const secretKey = SECRET_KEY ||"secret";

<<<<<<< HEAD
export const dbURL = MONGO_URI || "mongodb://localhost:27017/lethouz";
=======
export const dbURL =
  process.env.NODE_ENV == "development"
    ? "mongodb://127.0.0.1:27017/lethouz"
    : MONGO_URI;
>>>>>>> 47228f7a1fd9d09911bf6e6b4fc9e8ad557954be

export const sessionName = SESSION_NAME || "lethouz";

export const googleID = GOOGLE_CLIENT_ID;

export const googleSecret = GOOGLE_CLIENT_SECRET;

export const cloudinary = {
  api_key: CLOUDINARY_KEY,
  cloud_name: CLOUDINARY_NAME,
  api_secret: CLOUDINARY_SECRET,
};
