import React from "react";
import TestImage from "public/images/village.png";
import { getColorsFromImage } from "@/reusables/lib/colorFromImage";

export default function () {
  React.useEffect(() => {
    getColorsFromImage(TestImage.src);
  }, []);

  return (
    <div
      id="canvas_wrapper"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
}
