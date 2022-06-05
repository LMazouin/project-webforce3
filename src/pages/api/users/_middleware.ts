import { getToken } from "next-auth/jwt";
import { NextMiddleware, NextRequest, NextResponse } from "next/server";

const middleware: NextMiddleware = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const token = await getToken({ req, raw: true });

    if (!token) throw new Error("invalid token");
  } catch (error) {
    console.error(error);
  }
  return NextResponse.next();
};

export default middleware;
