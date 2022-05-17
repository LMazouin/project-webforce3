import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers";

export default NextAuth({
  providers: [CredentialsProvider({})],
  session: {
    strategy: "jwt",
    maxAge: 60,
    updateAge: 20,
  },
});
