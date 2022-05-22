import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
    };
    token: { email?: string; userId?: string; role?: Role; accessToken?: string };
  }
  interface User {
    userId?: string;
    email?: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    userId?: string;
    role?: Role;
    accessToken?: string;
  }
}
