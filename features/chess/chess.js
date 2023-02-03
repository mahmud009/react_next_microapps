let boardLength = 8;
let pieces = {
  king: 0,
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
};

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Game {
  constructor() {
    this.board = [];
    for (let i = 1; i <= 64; i++) {
      this.board.push({
        piece: i == 38 ? pieces.queen : null,
        isValidMove: false,
        coords: new Vec(
          i % boardLength == 0 ? boardLength : i % boardLength,
          Math.ceil(i / boardLength)
        ),
      });
    }
  }
}

Game.prototype.getValidMoves = function (cell) {
  let piece = cell.piece;
  let coords = cell.coords;

  switch (piece) {
    case 1:
      this.board = this.board.map((cell) => {
        let { x, y } = cell.coords;
        if (y == coords.y + 1 && x == coords.x) {
          cell.isValidMove = true;
        }
        return cell;
      });
      break;
    case 9:
      this.board = this.board.map((cell) => {
        let { x, y } = cell.coords;
        for (let i = 1; i <= boardLength; i++) {
          if (
            (coords.x + i == x && coords.y + i == y) ||
            (coords.x - i == x && coords.y - i == y) ||
            (coords.x + i == x && coords.y - i == y) ||
            (coords.x - i == x && coords.y + i == y) ||
            (coords.x == x && coords.y + i == y) ||
            (coords.x == x && coords.y - i == y) ||
            (coords.x + i == x && coords.y == y) ||
            (coords.x - i == x && coords.y == y)
          ) {
            cell.isValidMove = true;
          }
        }
        return cell;
      });
      break;
    case null:
      this.board = this.board.map((cell) => ({ ...cell, isValidMove: false }));
      break;
  }

  return this.board;
};
