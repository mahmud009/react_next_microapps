import React from "react";
import { Box, Text } from "@/reusables/components";
import { useTheme } from "@/reusables/hooks";
import { useSpring, animated } from "@react-spring/web";

interface Props {
  icon: React.ReactNode;
  text: string;
}

export function ListItem({ icon, text }: Props) {
  const { colors } = useTheme();

  return (
    <Box
      display="grid"
      gridTemplateColumns={`32px 1fr`}
      gap="16px"
      alignItems="center"
      opacity={0.7}
    >
      <Box color={"#ffffff"} fontSize={"24px"} height={"32px"} width="32px">
        {icon}
      </Box>
      <Box>
        <Text
          color="#ffffff"
          fontSize={"18px"}
          letterSpacing={"0.05em"}
          fontWeight={400}
        >
          {text}
        </Text>
      </Box>
    </Box>
  );
}
