import { Box, List } from "@/reusables/components";
import { useTheme } from "@/reusables/hooks";
import { ListItem } from "./ListItem";
import { BiHome } from "react-icons/bi";
import { MdOutlineHome } from "react-icons/md";
import { v4 as uuid } from "uuid";

let menuItems = [
  {
    icon: <MdOutlineHome />,
    text: "Home",
  },
  {
    icon: <MdOutlineHome />,
    text: "About",
  },
  {
    icon: <MdOutlineHome />,
    text: "Resume",
  },
  {
    icon: <MdOutlineHome />,
    text: "Portfolio",
  },
  {
    icon: <MdOutlineHome />,
    text: "Contact",
  },
];

export function SideBar() {
  const theme = useTheme();
  return (
    <Box
      width="350px"
      backgroundColor={theme.colors["base-100"]}
      padding="32px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <List backgroundColor={theme.colors.primary}>
        {menuItems.map((itm) => (
          <ListItem key={uuid()} icon={itm.icon} text={itm.text} />
        ))}
      </List>
    </Box>
  );
}
