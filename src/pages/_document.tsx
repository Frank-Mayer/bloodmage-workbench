import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="darkreader-lock" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Easily create projects using the Bloodmage engine."
        />
        <meta property="og:title" content="Bloodmage Workbench" />
        <meta
          property="og:description"
          content="Easily create projects using the Bloodmage engine."
        />
        <meta
          property="og:image"
          content="https://workbench.bloodmagesoftware.dev/favicon.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@bloodmage_sw" />
        <meta name="twitter:creator" content="@bloodmage_sw" />
        <meta name="twitter:title" content="Bloodmage Workbench" />
        <meta
          name="twitter:description"
          content="Easily create projects using the Bloodmage engine."
        />
        <meta
          name="twitter:image"
          content="https://workbench.bloodmagesoftware.dev/favicon.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
