import type { AppProps } from "next/app";
import React from "react";
import { ColorPicker } from "features/colorPicker";
import { Box } from "components/reusables";
import { ChessGame } from "features/chess";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box>
      <ChessGame />
    </Box>
  );
}
