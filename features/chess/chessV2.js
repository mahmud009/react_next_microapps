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

  isEqual(vec) {
    return this.x == vec.x && this.y == vec.y;
  }

  // prettier-ignore
  isDiagonal(vec) {
    let digonalDirs = [new Vec(-1, -1), new Vec(1, -1), new Vec(1, 1), new Vec(-1, 1)];
    for (let dir of digonalDirs) {
      if (this.isEqual(vec.add(dir))) {
        return true;
      }
    }
    return false;
  }
}

class Matrix {
  constructor(vec, element = (vec) => null) {
    this.width = vec.x;
    this.height = vec.y;
    this.content = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.content[y * this.width + x] = element(new Vec(x, y));
      }
    }
  }

  get(vec) {
    return this.content[vec.y * this.width + vec.x];
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

function isEqualTeam(pieceA, pieceB) {
  return pieceA && pieceB && pieceA.group == pieceB.group;
}

function validDest(from, to, board) {
  let piece = board.get(from);
  let destCell = board.get(to);
  let isBlocked = destCell && destCell.type;
  let isEnemy = isBlocked && piece.group !== destCell.group;
  let result = isBlocked ? false : true;
  if (isEnemy) result = true;
  return result;
}

function rayTraceCells(matrix, pos, dirs, dist) {
  let coords = [];
  for (let dir of dirs) {
    for (let step = 1; step <= dist; step++) {
      let dest = pos.add(dir.multiply(step));
      if (!matrix.isInside(dest)) break;
      if (validDest(pos, dest, matrix)) {
        coords.push(dest);
      }
    }
  }
  return coords;
}

function pawnMoves(piece, directions, board) {
  let moves = [];
  let coords = rayTraceCells(board, piece.coord, directions, 1);
  let isInitial = piece.coord.y == 6;
  let isVertBlocked = false;
  for (let coord of coords) {
    let blockedPiece = board.get(coord);
    let isDiagonal = piece.coord.isDiagonal(coord);
    let isOpponent = !!blockedPiece && !isEqualTeam(piece, blockedPiece);
    if (!!blockedPiece && isDiagonal && isOpponent) moves.push(coord);
    if (!isDiagonal && !blockedPiece) isVertBlocked = true;
  }
  return moves;
}

function knightMoves(cell, directions, board) {
  let moves = [];
  directions.map((dir) => {
    let edgeCoord = Vec.sum(cell.coords, Vec.multiplyByScalar(dir, 2));
    let isHoriz = edgeCoord.x == cell.coords.x;
    for (let step = -1; step <= 1; step++) {
      let stepVec = new Vec(isHoriz ? step : 0, isHoriz ? 0 : step);
      let destCoord = Vec.sum(edgeCoord, stepVec);
      if (step !== 0 && Matrix.isInsideBound(destCoord, boardSize)) {
        let destCell = Matrix.findCellByPos(destCoord, board);
        let isBlocked = isEqualTeam(cell.piece, destCell.piece);
        !isBlocked && moves.push(destCoord);
      }
    }
  });
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
    this.board = new Matrix(new Vec(8, 8), (vec) => {
      let item = pieceMap[vec.y][vec.x];
      if (!item) return item;
      return new Piece(item[1], item[0], vec);
    });
  }
}

let game = new Game();

function createMoves(piece) {
  let moves = [];
  let directions = moveDirections[piece.type].map((dir) => {
    return new Vec(dir[0], dir[1]);
  });
  if (piece.type > 3 || piece.type == 1) {
    let dist = piece.type == 1 ? 1 : boardSize;
    moves = rayTraceCells(game.board, piece.coord, directions, dist);
  }

  if (piece.type == 2) {
    moves = pawnMoves(piece, directions, game.board);
  }

  return moves;
}

export { game, createMoves };
