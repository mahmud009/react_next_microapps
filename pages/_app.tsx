import type { AppProps } from "next/app";
import React from "react";
import { ColorPicker } from "features/colorPicker";
import { ChessGame } from "features/chess";
// import "styles/globals.scss";
import { TicTocToeGame } from "@/features/tic_toc_toe/TicTocToeGame";
import { SpringAnimation } from "@/features/SpringAnimation";
import { AnimatedPage } from "@/features/animatedPage";
import { muiTheme } from "@/reusables/theme";
import { ThemeProvider } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "@/reusables/lib/createEmotionCache";
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache();

export interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: Props) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <AnimatedPage />
        {/* <Canvas /> */}
        {/* <ChessGame /> */}
        {/* <TicTocToeGame /> */}
        {/* <SpringAnimation /> */}
      </ThemeProvider>
    </CacheProvider>
  );
}
