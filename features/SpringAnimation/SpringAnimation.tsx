import { Box, Button } from "@/reusables/components";
import { useSpring, animated } from "@react-spring/web";
import React from "react";

export function SpringAnimation() {
  const [springs, api] = useSpring(() => ({ from: { x: 0 } }));
  let isStart = true;
  const onClick = (ev: any) => {
    api.start({ to: { x: isStart ? 100 : 0 } });
    isStart = !isStart;
  };

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button>Button</Button>
      <animated.div
        onClick={onClick}
        style={{
          width: 80,
          height: 80,
          background: "#ff6d6d",
          borderRadius: 8,
          cursor: "pointer",
          ...springs,
        }}
      />
    </Box>
  );
}
