import type { AppProps } from "next/app";
import React from "react";
import { ColorPicker } from "features/colorPicker";
import { Box } from "components/reusables";
import { ChessGame } from "features/chess";
import "styles/globals.scss";
import { ProfileContainer } from "@/features/profiles";
import { Canvas } from "@/components/reusables/Canvas/Canvas";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box>
      {/* <Canvas /> */}
      <ChessGame />
    </Box>
  );
}
