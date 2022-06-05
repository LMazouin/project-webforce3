import { compare } from "bcrypt";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, Users } from "../../../models/users";
import connectToMongoDB from "../../../utils/mongoose";

type Credentials = Record<"email" | "password", string> | undefined;

type JWTArgs = {
  token: JWT;
  user?: User | undefined;
};

type SessionArgs = {
  session: Session;
  token: JWT;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials: Credentials): Promise<User> {
        if (!credentials) throw new Error("CREDENTIALS MISSING");

        await connectToMongoDB();

        const user: IUser = await Users.findOne({ email: credentials.email }).lean();

        if (!user) throw new Error("Ce compte n'existe pas.");

        const match = await compare(credentials.password, user.password || "");

        if (!match) throw new Error("Votre mot passe n'est pas correct.");

        return { email: user.email, id: user._id?.toString(), role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 10 },
  callbacks: {
    jwt: async (args: JWTArgs): Promise<JWT> => {
      const { token, user } = args;

      const newToken = { ...token };

      if (user) {
        newToken.userId = user.id;
        newToken.role = user.role;
      }

      return newToken;
    },
    session: async (args: SessionArgs): Promise<Session> => {
      const { session, token } = args;

      const newSession = { ...session };

      newSession.token = token;

      return newSession;
    },
  },
});
