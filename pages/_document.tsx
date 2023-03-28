import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      ></link>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
