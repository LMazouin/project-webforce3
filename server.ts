import { IncomingMessage, ServerResponse } from "http";
import "dotenv/config";
import next from "next";
import express, { Request, Response } from "express";
import mongoose, { Connection } from "mongoose";
import * as logger from "morgan";

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function connectToMongoDB(uri: string): Connection {
  mongoose.connect(uri);
  return mongoose.connection
    .on("connected", console.info.bind(logger, "CONNECTED TO MONGODB"))
    .on("disconnected", console.info.bind(logger, "DISCONNECTED FROM MONGODB"))
    .on("reconnected", console.info.bind(logger, "RECONNECTED TO MONGODB"))
    .on("error", console.info.bind(logger, "MONGODB ERROR"));
}

app.prepare().then(() => {
  try {
    const server = express();

    process.on("SIGINT", () => {
      console.log("\rCLOSING CONNECTION TO MONGODB");
      mongoose.connection.close();
      console.log("SHUTTING DOWN SERVER");
      process.exit(0);
    });

    if (process.env.MONGODB_URI) connectToMongoDB(process.env.MONGODB_URI);

    server.get("*", (req: IncomingMessage, res: ServerResponse) => {
      return handle(req, res);
    });

    server
      .listen(port, hostname, () => {
        console.log("> Ready on http://localhost:3000");
      })
      .once("error", (error: Error) => {
        throw error;
      });
  } catch (error) {
    if (error instanceof Error)
      console.error("internal server error", error.stack);
    process.exit(1);
  }
});
