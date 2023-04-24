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

  isDiagonal(vec) {
    return !(vec.x == 0 || vec.y == 0);
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
  if (board.isInside(to)) {
    let piece = board.get(from);
    let destCell = board.get(to);
    let isBlocked = destCell && destCell.type;
    let isEnemy = isBlocked && piece.group !== destCell.group;
    return { isBlocked, isEnemy, isInside: true };
  } else {
    return { isBlocked: false, isEnemy: false, isInside: false };
  }
}

function rayTraceCells(board, pos, dirs, dist, canCapture = true) {
  let coords = [];
  for (let dir of dirs) {
    for (let step = 1; step <= dist; step++) {
      let dest = pos.add(dir.multiply(step));
      let { isBlocked, isEnemy, isInside } = validDest(pos, dest, board);
      if (!isBlocked || (isEnemy && canCapture)) coords.push(dest);
      if (isBlocked || !isInside) break;
    }
  }
  return coords;
}

function pawnMoves(piece, dirs, board) {
  let isInitial = piece.coord.y == 6;
  let isDiagEnemy = false;
  dirs = dirs.filter((dir) => {
    let from = piece.coord;
    let to = piece.coord.add(dir);
    let { isBlocked, isEnemy } = validDest(from, to, board);
    let isDiagDir = piece.coord.isDiagonal(dir);
    if (!isDiagEnemy) isDiagEnemy = isDiagDir && isEnemy;
    if ((isDiagDir && isEnemy) || (!isDiagDir && !isBlocked)) return true;
    return false;
  });
  let dist = isInitial && !isDiagEnemy ? 2 : 1;
  return rayTraceCells(board, piece.coord, dirs, dist, isDiagEnemy);
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
