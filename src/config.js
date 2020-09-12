import { config } from "dotenv";

config();

const {
  SECRET_KEY,
  MONGO_URI,
  SESSION_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

export const port = process.env.PORT || 8080;

export const secretKey = SECRET_KEY;

export const dbURL = MONGO_URI;

export const sessionName = SESSION_NAME;

export const googleID = GOOGLE_CLIENT_ID;

export const googleSecret = GOOGLE_CLIENT_SECRET;
