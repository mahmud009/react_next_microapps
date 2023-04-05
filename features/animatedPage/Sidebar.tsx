import { Box, List } from "@/reusables/components";
import { useTheme } from "@/reusables/hooks";
import { ListItem } from "./ListItem";
import {
  FiHome,
  FiCoffee,
  FiFile,
  FiGrid,
  FiMessageCircle,
} from "react-icons/fi";
import { v4 as uuid } from "uuid";
import { animated, useSprings } from "@react-spring/web";

let menuItems = [
  {
    icon: <FiHome />,
    text: "Home",
  },
  {
    icon: <FiCoffee />,
    text: "About",
  },
  {
    icon: <FiFile />,
    text: "Resume",
  },
  {
    icon: <FiGrid />,
    text: "Portfolio",
  },
  {
    icon: <FiMessageCircle />,
    text: "Contact",
  },
];

export function SideBar() {
  const theme = useTheme();

  const springs = useSprings(
    menuItems.length,
    menuItems.map((item, index) => ({
      from: { y: 30, opacity: 0 },
      to: { y: 0, opacity: 1 },
      delay: index * 150, // set a delay based on the index
      config: { duration: 600 },
    }))
  );

  return (
    <Box
      width="350px"
      backgroundColor={theme.colors["base-100"]}
      padding="32px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <List display="grid" gridTemplateColumns={"1fr"} gap={"16px"}>
        {springs.map((spring, idx) => {
          let itm = menuItems[idx];

          return (
            <Box overflow="hidden" key={uuid()}>
              <animated.div style={spring}>
                <ListItem icon={itm.icon} text={itm.text} />
              </animated.div>
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
