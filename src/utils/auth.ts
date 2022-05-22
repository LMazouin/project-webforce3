import { GetServerSidePropsContext } from "next";

export const auth = (context: GetServerSidePropsContext): string => {
  return context.req.cookies["next-auth.session-token"];
};
