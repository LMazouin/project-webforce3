import type { AppProps } from "next/app";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Projet WebForce3</title>
        <meta name="description" content="webforce3" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
