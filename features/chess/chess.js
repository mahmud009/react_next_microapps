import { pieceMap } from "./static";
import { Vec, Matrix } from "./utils.math";

export class Piece {
  constructor(type, group, coord) {
    this.type = Number(type);
    this.group = group;
    this.coord = coord;
    this.moves = [];
  }
}

export class Game {
  constructor() {
    this.board = new Matrix(new Vec(8, 8), (vec) => {
      let pieceCode = pieceMap[vec.y][vec.x];
      if (pieceCode == null) return null;
      return pieceCode;
    });
    this.status = "playing";
  }

  update(pieceCode, from, to) {
    this.board.set(from.x, from.y, null);
    this.board.set(to.x, to.y, pieceCode);
    return this;
  }
}

// Game Class
// board
