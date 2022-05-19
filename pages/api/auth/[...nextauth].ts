import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, Users } from "../../../models/users";
import { compare } from "bcrypt";
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
          throw new Error("Ce compte n'existe pas.");
        }
        console.log(user);
        const match = await compare(credentials.password, user.password);
        if (!match) {
          throw new Error("Votre mot passe n'est pas correct.");
        }
        return { email: user.email, userId: user._id, roles: user.roles };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 10,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.roles = user.roles;
      }
      return token;
    },
  },
});
