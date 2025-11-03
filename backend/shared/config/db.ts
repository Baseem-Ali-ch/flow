import mongoose from "mongoose";
import { config } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb_uri);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.error("mongodb connection failed", error);
    process.exit(1);
  }
};

export { mongoose };
