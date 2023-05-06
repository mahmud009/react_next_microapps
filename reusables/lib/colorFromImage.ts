function drawImage() {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.backgroundColor = "white";
  canvas.style.border = "1px solid black";
  let wrapper = document.getElementById("canvas_wrapper");
  wrapper?.append(canvas);
}

function createRgbColors(data: Uint8ClampedArray) {
  let result = [];
  let rgb = [];
  for (let i = 0; i < data.length; i++) {
    rgb.push(data[i]);
    if ((i + 1) % 4 == 0) {
      result.push(rgb);
      rgb = [];
    }
  }
  return result;
}

export function getColorsFromImage(path: string) {
  const img: HTMLImageElement = new Image();
  img.src = path;

  img.onload = function () {
    let self = this as any;
    const canvas = document.createElement("canvas");
    canvas.width = self.width;
    canvas.height = self.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.drawImage(self, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let colors = createRgbColors(imageData);
    console.log(imageData.length);
    console.log(colors.length * 4);
    drawImage();
  };
}
