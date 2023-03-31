import type { AppProps } from "next/app";
import React from "react";
import { ColorPicker } from "features/colorPicker";
import { Box } from "components/reusables";
import { ChessGame } from "features/chess";
import "styles/globals.scss";
import { ProfileContainer } from "@/features/profiles";
import { Canvas } from "@/components/reusables/Canvas/Canvas";
import { TicTocToeGame } from "@/features/tic_toc_toe/TicTocToeGame";
import { SpringAnimation } from "@/features/SpringAnimation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box>
      {/* <Canvas /> */}
      <ChessGame />
      {/* <TicTocToeGame /> */}
      {/* <SpringAnimation /> */}
    </Box>
  );
}
