import { Box } from "@/reusables/components/Box";

export function Profile(props) {
  return (
    <Box width={"800px"}>
      <div style={{}}></div>
      <Box
        backgroundColor={"lightblue"}
        display="grid"
        gridTemplateColumns={"repeat(4, 1fr)"}
        gridTemplateRows={"repeat(4, 1fr)"}
        gap="20px"
        width={"100%"}
      ></Box>
    </Box>
  );
}
