import { createTheme } from "@mui/material";
import { Roboto } from "@next/font/google";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export const theme = {
  colors: {
    primary: "#c633ce",
    secondary: "#5bd899",
    accent: "#f48d9f",
    neutral: "#232A2F",
    info: "#8CB1F3",
    success: "#1CD4B2",
    warning: "#F7CF4A",
    error: "#F13B5A",
    "base-100": "#323343",
  },
};
