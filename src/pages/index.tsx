import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import Layout from "../components/lib/Layout";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { permanent: false, destination: "/authentication" } };
  }

  return { props: {} };
};

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio repellendus autem praesentium enim fuga maxime
        suscipit! Voluptatum repellendus eum dolorum eaque ex consequatur dicta? Dolore excepturi nisi aspernatur quo
        quisquam!
      </Typography>
    </Layout>
  );
}
