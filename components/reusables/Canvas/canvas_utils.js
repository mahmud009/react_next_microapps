let x = 0;
let y = 0;
let dx = 5;
let dy = 5;

export function runCanvas(canvas) {
  /** @type {CanvasRenderingContext2D} */
  let ctx = canvas.getContext("2d");
  function animate() {
    requestAnimationFrame(animate);

    // Clear the canvas
    ctx.clearRect(0, 0, 300, canvas.height);

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
  }
  animate();
}
