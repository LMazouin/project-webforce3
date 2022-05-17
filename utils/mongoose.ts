import "dotenv/config";
import logger from "morgan";
import mongoose, { Connection } from "mongoose";

export function connectToMongoDB(): Connection {
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection
    .on("connected", console.info.bind(logger, "CONNECTED TO MONGODB"))
    .on("reconnected", console.info.bind(logger, "RECONNECTED TO MONGODB"));
}
