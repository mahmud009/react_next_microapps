import React from "react";
import { Box } from "components/reusables/Box";

let intensity = 0.7;
let blockDimension = { width: 50, height: 50 };

export function ColorPicker() {
  const [values, setValues] = React.useState<number[]>([0]);

  React.useEffect(() => {
    let values = [];
    for (let i = 1; i < 256; i++) {
      values.push(i);
    }
    console.log(values);
    setValues(values);
  }, []);

  return (
    <Box
      border="1px solid gray"
      padding={"4px"}
      display="flex"
      flexWrap="wrap"
      width={`${values.length * blockDimension.width}px`}
      //   height={`${values.length * blockDimension.height}px`}
    >
      {values.map((value) => (
        <Box
          backgroundColor={`rgba(${value}, 0, 0, ${intensity})`}
          {...blockDimension}
        />
      ))}
      {values.map((value) => (
        <Box
          backgroundColor={`rgba( 0, ${value}, 0, ${intensity})`}
          {...blockDimension}
        />
      ))}
      {values.map((value) => (
        <Box
          backgroundColor={`rgba(0, 0, ${value}, ${intensity})`}
          {...blockDimension}
        />
      ))}
    </Box>
  );
}
