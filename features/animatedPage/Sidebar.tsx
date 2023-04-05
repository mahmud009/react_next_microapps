import { Box } from "@/reusables/components";
import { useTheme } from "@/reusables/hooks";
import { ListItem } from "./ListItem";

export function SideBar() {
  const theme = useTheme();
  return (
    <Box
      width="350px"
      height="100%"
      backgroundColor={theme.colors["base-100"]}
      padding="32px"
    >
      <ListItem />
    </Box>
  );
}
