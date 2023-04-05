import { Box, Text } from "@/reusables/components";
import { useTheme } from "@/reusables/hooks";
import { SideBar } from "./Sidebar";

export function AnimatedPage() {
  const theme = useTheme();

  return (
    <Box
      backgroundColor={theme.colors.neutral}
      width={"100%"}
      height={"100vh"}
      display="flex"
      justifyContent="flex-end"
      overflow="hidden"
    >
      <SideBar />
    </Box>
  );
}
