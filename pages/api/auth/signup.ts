import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const mongodbClient = await clientPromise;

    const 

    await mongodbClient.db("wf3").collection("users").insertOne(req.body);

    res.status(200).json({ message: "OK" });
  }
}
