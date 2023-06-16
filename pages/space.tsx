import React from "react";
import { Viewer } from "cesium";

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("features/SpacePage/SpacePage"),
  {
    ssr: false,
  }
);

const DynamicPage = () => <DynamicComponentWithNoSSR />;

export default DynamicPage;
