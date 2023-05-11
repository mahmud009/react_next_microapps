import { pieceMap } from "./static";
import { Vec, Matrix } from "./utils.math";

export class Piece {
  constructor(type, group, coord) {
    this.type = Number(type);
    this.group = group;
    this.coord = coord;
    this.moves = [];
  }
  createMoves() {}
  move() {}
}

class Game {
  constructor() {
    this.board = new Matrix(new Vec(8, 8), (vec) => {
      let item = pieceMap[vec.y][vec.x];
      if (!item) return item;
      return new Piece(item[1], item[0], vec);
    });
  }
}

let game = new Game();

export { game };
