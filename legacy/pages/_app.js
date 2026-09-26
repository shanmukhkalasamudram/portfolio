import Head from "next/head";

import "../styles/styles.scss";

// shanmukh.is-a.dev is the canonical home; shanmukh-sai.vercel.app serves the
// same deployment, so every page points search engines and link previews here.
const SITE_URL = "https://shanmukh.is-a.dev";

const SITE_NAME = "K V Shanmukha Sai";
const SITE_DESC =
  "Software engineer specializing in backend development — scalable microservices, high-performance REST APIs and event-driven systems.";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content={SITE_DESC} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content={SITE_DESC} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SITE_NAME} />
        <meta name="twitter:description" content={SITE_DESC} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
