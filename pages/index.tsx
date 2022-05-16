import { Button, ThemeProvider } from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Button variant="contained" color="primary">
        Bonjour
      </Button>
    </>
  );
};

export default Home;
