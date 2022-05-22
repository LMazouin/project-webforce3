import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { FunctionComponent } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { PageProvider } from "../contexts/pageContext";

const App: FunctionComponent<AppProps> = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
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
        <Component {...pageProps} />
      </PageProvider>
    </SessionProvider>
  </>
);

export default App;
