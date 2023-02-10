class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static isEqual(vec1, vec2) {
    return vec1.x == vec2.x && vec1.y == vec2.y;
  }

  static sum(...vectors) {
    let sum = new Vec(0, 0);
    vectors.forEach((vector) => {
      sum.x += vector.x;
      sum.y += vector.y;
    });
    return sum;
  }
}

let boardSize = 8;
let teamPrefix = ["A", "B"];
let pieces = {
  king: 1,
  pawn: 2,
  knight: 3,
  bishop: 4,
  rook: 5,
  queen: 6,
};

let moveDirections = {
  6: [
    new Vec(1, 1),
    new Vec(-1, -1),
    new Vec(-1, 1),
    new Vec(1, -1),
    new Vec(0, 1),
    new Vec(1, 0),
    new Vec(0, -1),
    new Vec(-1, 0),
  ],
};

function calcCellIndex(vec) {
  return (vec.y - 1) * boardSize + vec.x - 1;
}

export class Game {
  constructor() {
    this.board = [];
    for (let i = 1; i <= 64; i++) {
      this.board.push({
        piece:
          i == 29
            ? teamPrefix[0] + pieces.queen
            : i == 11
            ? teamPrefix[1] + pieces.pawn
            : i == 37
            ? teamPrefix[1] + pieces.pawn
            : "",
        isValidMove: false,
        coords: new Vec(
          i % boardSize == 0 ? boardSize : i % boardSize,
          Math.ceil(i / boardSize)
        ),
      });
    }
  }
}

function createMoves(cell, board) {
  let pieceId = Number(cell.piece[1]);
  let team = cell.piece[0];
  switch (pieceId) {
    case pieces.queen:
      let directions = moveDirections[pieceId];
      directions.forEach((dir) => {
        let coords = Vec.sum(cell.coords, dir);
        while (
          coords.x <= 8 &&
          coords.y <= 8 &&
          coords.x >= 1 &&
          coords.y >= 1
        ) {
          let cellIndex = calcCellIndex(coords);
          let blockedPiece = board[cellIndex].piece;
          if (blockedPiece) {
            board[cellIndex].isValidMove = blockedPiece[0] != team;
            break;
          }
          board[calcCellIndex(coords)].isValidMove = true;
          coords = Vec.sum(coords, dir);

          // nextCell = board[calcCellIndex(coords)];
        }
      });
      return board;
  }

  return board;
}

Game.prototype.getValidMoves = function (cell) {
  let piece = cell.piece;
  let coords = cell.coords;
  this.board = createMoves(cell, this.board);
  return this.board;
};
