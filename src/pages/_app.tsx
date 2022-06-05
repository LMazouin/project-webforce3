import type { AppProps } from "next/app";
import Head from "next/head";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import CssBaseline from "@mui/material/CssBaseline";
import { PageProvider } from "../contexts/pageContext";

interface PageProps {
  session: Session;
  token: string;
}

export default function App(props: AppProps<PageProps>): JSX.Element {
  const { Component, pageProps } = props;
  const { session, token } = pageProps;
  return (
    <>
      <Head>
        <title>Projet WebForce3</title>
        <meta name="description" content="webforce3" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <SessionProvider session={session}>
        <PageProvider value={pageProps}>
          <Component token={token} session={session} />
        </PageProvider>
      </SessionProvider>
    </>
  );
}
