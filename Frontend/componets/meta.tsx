import Head from "next/head"; // HTML Head


export default function Meta() {
  return (
    <Head>
      {/* Fonts: Inter */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href={`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap`}
        rel="stylesheet"
      />

      {/* Primary Meta */}
      <title>Dispay</title>
      <meta name="title" content="Dispay" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

     

      {/* Favicon */}
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
}
