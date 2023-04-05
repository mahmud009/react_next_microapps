import type { AppProps } from "next/app";
import React from "react";
import { ColorPicker } from "features/colorPicker";
import { Box } from "@/reusables/components";
import { ChessGame } from "features/chess";
// import "styles/globals.scss";
import { TicTocToeGame } from "@/features/tic_toc_toe/TicTocToeGame";
import { SpringAnimation } from "@/features/SpringAnimation";
import { AnimatedPage } from "@/features/animatedPage";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *  {
    margin : 0;
    padding : 0;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Box>
        <AnimatedPage />
        {/* <Canvas /> */}
        {/* <ChessGame /> */}
        {/* <TicTocToeGame /> */}
        {/* <SpringAnimation /> */}
      </Box>
    </>
  );
}
