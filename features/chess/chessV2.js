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

function rayTraceCells(matrix, pos, dirs, dist) {
  let coords = [];
  for (let dir of dirs) {
    for (let step = 1; step <= dist; step++) {
      let destCoord = pos.add(dir.multiply(step));
      if (matrix.isInside(destCoord)) {
        coords.push(destCoord);
      }
    }
  }
  return coords;
}

export function linearMoves(piece, directions, board, distance) {
  let moves = [];
  for (let dir of directions) {
    for (let step = 1; step <= distance; step++) {
      let destCoord = piece.coord.add(dir.multiply(step));
      if (!board.isInside(destCoord)) break;
      let destCell = board.get(destCoord);
      let isBlocked = destCell && destCell.type;
      let isEnemy = isBlocked && piece.group !== destCell.group;
      if (isBlocked && isEnemy) {
        moves.push(destCoord);
        break;
      }
      if (isBlocked) break;
      moves.push(destCoord);
    }
  }
  return moves;
}

function pawnMoves(piece, directions, board) {
  let moves = [];
  let coords = rayTraceCells(board, piece.coord, directions, 1);
  let isInitial = piece.coord.y == 7;
  for (let coord of coords) {
    let pieceA = board.get(coord);
    // if (pieceA && !isEqualTeam(pieceA, piece)) {
    //   moves.push(coord);
    // }
    moves.push(coord);
  }
  console.log(moves);
  let allowTwo = isInitial && moves.length == 0;
  moves.push(linearMoves(piece, directions, board, allowTwo ? 2 : 1));
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
  if (piece.type > 3) {
    moves = linearMoves(piece, directions, game.board, boardSize, true);
  }
  if (piece.type == 1) {
    moves = linearMoves(piece, directions, game.board, 1, true);
  }

  if (piece.type == 2) {
    moves = pawnMoves(piece, directions, game.board);
  }

  return moves;
}

export { game, createMoves };
