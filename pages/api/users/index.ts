import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { IUser, Users } from "../../../models/users";
import connectToMongoDB from "../../../utils/mongoose";

type Data = {
  message?: string;
  data?: IUser[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const token = await getToken({ req });

    if (!token) {
      throw new Error("NOT AUTHENTICATED");
    }

    const { userId } = token;

    console.log({ userId });

    await connectToMongoDB();
    const users: IUser[] = await Users.find({ _id: { $ne: userId } }, "email role")
      .sort("email")
      .lean();
    res.status(200).json({ data: users });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default handler;
