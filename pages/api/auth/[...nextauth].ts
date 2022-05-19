import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, Users } from "../../../models/users";
import { compare } from "bcrypt";
import connectToMongoDB from "../../../utils/mongoose";
import { JWT } from "next-auth/jwt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("CREDENTIALS MISSING");
        }
        await connectToMongoDB();
        const user: IUser = await Users.findOne({ email: credentials.email }).lean();
        if (!user) {
          console.log("user not in database");
          throw new Error("Ce compte n'existe pas.");
        }
        const match = await compare(credentials.password, user.password);
        if (!match) {
          throw new Error("Votre mot passe n'est pas correct.");
        }
        return { email: user.email, userId: user._id, role: user.role };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 10,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
      if (user) {
        token.userId = user.userId;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      session.role = token.role || "visitor";
      return session;
    },
  },
});
