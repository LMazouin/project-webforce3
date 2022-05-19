import type { NextApiRequest, NextApiResponse } from "next";
import { IUser, Users } from "../../../models/users";
import { hash } from "bcrypt";
import connectToMongoDB from "../../../utils/mongoose";

async function createUser(body: IUser): Promise<void> {
  const hashedPassword = await hash(body.password, 10);
  const user: IUser = await Users.findOne({ email: body.email, deleted: false }).lean();
  if (user) {
    throw new Error("Cet email est déjà utilisé.");
  }
  await Users.create({ ...body, password: hashedPassword, role: "user" });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      await connectToMongoDB();

      createUser(req.body);

      res.status(200).json({ message: "Votre compte a bien été créé." });
    } catch (error) {
      console.log(error.message);
      res.statusCode = 500;
    }
  }
}
