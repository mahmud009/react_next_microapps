import { styled } from "@/stitches.config";

export const Button = styled("button", {
  backgroundColor: "green",
  borderRadius: "9999px",
  fontSize: "13px",
  padding: "10px 15px",
  border: "none",
  "&:hover": {
    backgroundColor: "lightgray",
  },
});
