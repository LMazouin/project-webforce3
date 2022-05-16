import "dotenv/config";
import next from "next";
import express, { Request, Response } from "express";
import { IncomingMessage, ServerResponse } from "http";

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  try {
    const server = express();

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
