import { pieceMap, pieces, boardSize, moveDirections } from "./static";

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }
  multiply(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

function indexToVector(idx) {
  return new Vec(idx % boardSize, Math.floor(idx / 8));
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

  isInside(vec) {
    return (
      vec.x < this.width && vec.x >= 0 && vec.x < this.height && vec.y >= 0
    );
  }
}

export function linearMoves(piece, directions, board, distance, captureEdge) {
  let moves = [];
  for (let dir of directions) {
    for (let step = 1; step <= distance; step++) {
      let destCoord = piece.coord.add(dir).multiply(step);
      if (!board.isInside(destCoord)) break;
      let destCell = board.get(destCoord);
      let isBlocked = destCell && destCell.type;
      let isEnemy = isBlocked && piece.group !== destCell.group;
      if (isBlocked && isEnemy && captureEdge) {
        moves.push(destCoord);
        break;
      }
      if (isBlocked) break;
      moves.push(destCoord);
    }
  }
  return moves;
}

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
    this.board = new Matrix(8, 8, (x, y) => {
      let item = pieceMap[y][x];
      if (!item) return item;
      return new Piece(item[1], item[0], new Vec(x, y));
    });
  }
}

let game = new Game();

function createMoves(piece) {
  let moves = [];
  let directions = moveDirections[piece.type].map(
    (dir) => new Vec(dir[0], dir[1])
  );
  if (piece.type > 3) {
    moves = linearMoves(piece, directions, game.board, boardSize, true);
  }

  return moves;
}

export { game, createMoves };
