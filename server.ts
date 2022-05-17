import { IncomingMessage, ServerResponse } from "http";
import "dotenv/config";
import next from "next";
import express, { Request, Response } from "express";
import logger from "morgan";

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

process.on("SIGINT", () => {
  console.log("\rSHUTTING DOWN SERVER");
  process.exit(0);
});

app.prepare().then(() => {
  try {
    const server = express();

    server.get("*", (req: IncomingMessage, res: ServerResponse) => {
      return handle(req, res);
    });

    server.post("*", (req, res) => {
      return handle(req, res);
    });

    server
      .listen(port, hostname, () => {
        console.log("READY ON http://localhost:3000");
      })
      .once("error", (error: Error) => {
        throw error;
      });
  } catch (error) {
    if (error instanceof Error) {
      console.error("INTERNAL SERVER ERROR", error.stack);
      process.exit(1);
    }
  }
});
