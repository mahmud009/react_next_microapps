const boardSize = 3;

class Matrix {
  constructor(width, height, element = (x, y) => null) {
    this.width = width;
    this.height = height;
    this.content = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.content[y * this.width + x] = element(x, y);
      }
    }
  }
}

class Game {
  constructor() {
    this.board = new Matrix(boardSize, boardSize);
  }
}

let game = new Game();

export { game };
