import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/mongodb";

export default NextAuth({
  providers: [],
  session: {
    strategy: "database",
    maxAge: 60,
    updateAge: 20,
  },
  adapter: MongoDBAdapter(clientPromise),
});
