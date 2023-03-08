import { pieceMap } from "./static";

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  sum(x, y) {
    return new Vec(this.x + x, this.y + y);
  }
  multiply(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

class Matrix {
  constructor(width, height, element = (x, y) => null) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }

  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

export class Piece {
  constructor(type, group, position) {
    this.type = type;
    this.group = group;
    this.position = position;
    this.moves = [];
  }

  move() {}
}

class Game {
  constructor() {
    this.board = new Matrix(8, 8, (x, y) => {
      let item = pieceMap[y][x];
      if (!item) return item;
      return new Piece(item[1], item[0], new Vec(x, y));
    });
  }
}

let game = new Game();

export { game };
