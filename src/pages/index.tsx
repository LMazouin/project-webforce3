import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Typography } from "@mui/material";
import Layout from "../components/lib/Layout";
import { getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { permanent: false, destination: "/authentication" } };
  }

  return { props: {} };
};

const Home: NextPage = (): JSX.Element => (
  <Layout>
    <Typography paragraph>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio repellendus autem praesentium enim fuga maxime
      suscipit! Voluptatum repellendus eum dolorum eaque ex consequatur dicta? Dolore excepturi nisi aspernatur quo
      quisquam!
    </Typography>
  </Layout>
);

export default Home;