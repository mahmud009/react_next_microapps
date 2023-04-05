import React from "react";
import { runCanvas } from "./canvas_utils";

export function Canvas() {
  const ref = React.useRef(null) as any;

  React.useEffect(() => {
    if (ref.current) {
      console.log(ref.current);
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");

      let x = canvas.width / 2;
      let y = canvas.height / 2;
      let dx = 5;
      let dy = 5;

      const animate = () => {
        requestAnimationFrame(animate);

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw a circle at the current position
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();

        // Update the position
        x += dx;
        y += dy;

        // Reverse direction if we hit a wall
        if (x + 30 > canvas.width || x - 30 < 0) {
          dx = -dx;
        }
        if (y + 30 > canvas.height || y - 30 < 0) {
          dy = -dy;
        }
      };

      animate();
    }
  }, [ref]);

  return (
    <canvas
      ref={ref}
      id="test-canvas"
      style={{ backgroundColor: "rgb(60, 30, 90 )" }}
    ></canvas>
  );
}
