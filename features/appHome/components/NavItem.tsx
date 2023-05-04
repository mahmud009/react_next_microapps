import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

interface Props {
  url: string;
  icon: React.ReactNode;
  iconColor: string;
  name: string;
  onClick: (url: string) => void;
}

const bgGradient =
  "linear-gradient(to right top, #22546c, #1f4b5f, #1d4253, #1a3a47, #18313c);";

export function NavItem(props: Props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        cursor: "pointer",
        padding: "8px",
        borderRadius: "16px",
        // backgroundColor: "#0E1618",
        // backgroundImage: bgGradient,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Box
        fontSize={"32px"}
        color={props.iconColor}
        sx={{
          backgroundImage: bgGradient,
          width: "64px",
          height: "64px",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #005B8C",
        }}
      >
        {props.icon}
      </Box>
      <Box mt={"4px"}>
        <Typography
          variant="caption"
          fontSize={"14px"}
          color={theme.palette.common.white}
        >
          {props.name}
        </Typography>
      </Box>
    </Box>
  );
}
