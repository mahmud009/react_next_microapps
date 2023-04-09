import type { AppProps } from "next/app";
import React from "react";
import { ColorPicker } from "features/colorPicker";
import { Box } from "@/reusables/components";
import { ChessGame } from "features/chess";
// import "styles/globals.scss";
import { TicTocToeGame } from "@/features/tic_toc_toe/TicTocToeGame";
import { SpringAnimation } from "@/features/SpringAnimation";
import { AnimatedPage } from "@/features/animatedPage";
import { Global, css } from "@emotion/react";
import { theme } from "@/reusables/theme";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${theme.colors.neutral};
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Box>
        {/* <AnimatedPage /> */}
        {/* <Canvas /> */}
        <ChessGame />
        {/* <TicTocToeGame /> */}
        {/* <SpringAnimation /> */}
      </Box>
    </>
  );
}
