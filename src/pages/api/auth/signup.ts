import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { IUser, Users } from "../../../models/users";
import connectToMongoDB from "../../../utils/mongoose";

async function createUser(body: IUser): Promise<void> {
  if (!body.password) throw new Error("PASSWORD NOT PROVIDED");

  const hashedPassword = await hash(body.password, 10);

  const user: IUser = await Users.findOne({ email: body.email, deleted: false }).lean();

  if (user) throw new Error("Cet email est déjà utilisé.");

  await Users.create({ ...body, password: hashedPassword, role: "user" });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectToMongoDB();

      await createUser(req.body);

      res.status(200).json({ message: "Votre compte a bien été créé." });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      res.statusCode = 500;
    }
  }
}
