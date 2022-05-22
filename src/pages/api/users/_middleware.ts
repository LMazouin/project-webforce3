import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const middleware: NextMiddleware = async (req: NextRequest, event: NextFetchEvent): Promise<NextResponse> => {
  try {
    const token = await getToken({ req, raw: true });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.next();
};

export default middleware;
