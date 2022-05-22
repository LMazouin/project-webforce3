import { compare } from "bcrypt";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, Users } from "../../../models/users";
import connectToMongoDB from "../../../utils/mongoose";

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
        const match = await compare(credentials.password, user.password || "");
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
    jwt: async ({ token, user }: { token: JWT; user?: User | undefined }): Promise<JWT> => {
      if (user) {
        token.userId = user.userId;
        token.role = user.role;
      }
      return token;
    },
    session: async ({session, token }:{ session: Session, token: JWT }) => {
      session.token = token;
      return session;
    },
  },
});
