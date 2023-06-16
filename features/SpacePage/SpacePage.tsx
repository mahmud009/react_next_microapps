import React from "react";
import { Viewer } from "cesium";

export default function SpacePage() {
  React.useEffect(() => {
    window.CESIUM_BASE_URL = "http://localhost:4500";
    const viewer = new Viewer("cesiumContainer");
  }, []);

  return (
    <>
      <div id="cesiumContainer"></div>
    </>
  );
}
