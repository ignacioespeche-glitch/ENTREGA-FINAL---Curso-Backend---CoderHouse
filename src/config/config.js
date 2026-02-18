import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  persistence: process.env.PERSISTENCE || "mongo",
  mongoUrl: process.env.MONGO_URL
};
