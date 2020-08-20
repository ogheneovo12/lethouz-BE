import { config } from "dotenv";

config();

const {SECRET_KEY , MONGO_URI , SESSION_NAME} = process.env;

export const port = process.env.PORT || 5000;

export const secretKey = SECRET_KEY;

export const dbURL = MONGO_URI;

export const sessionName = SESSION_NAME;