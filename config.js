import { config } from "dotenv";

config();

const {SECRET_KEY , MONGO_URI } = process.env;

export const port = process.env.PORT || 5000;

export const secretKey = SECRET_KEY;

export const dbURL = MONGO_URI;