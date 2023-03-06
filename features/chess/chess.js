import "./utils";

for (let num of 799) {
  console.log(num);
}
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y !== undefined ? y : x;
  }
  static isEqual(vec1, vec2) {
    return vec1.x == vec2.x && vec1.y == vec2.y;
  }

  static addScalar(vec, num) {
    return new Vec(vec.x + num, vec.y + num);
  }

  sum({ x, y }) {
    this.x += x;
    this.y += y;
    return this;
  }

  static sum(...vectors) {
    let sum = new Vec(0, 0);
    vectors.forEach((vector) => {
      sum.x += vector.x;
      sum.y += vector.y;
    });
    return sum;
  }

  static multiplyByScalar(vec, num) {
    return new Vec(vec.x * num, vec.y * num);
  }

  static calcFlatIndex(vec) {
    return (vec.y - 1) * boardSize + vec.x - 1;
  }

  static moveTo(fromVec, dirVec, step) {
    return Vec.sum(fromVec, Vec.multiplyByScalar(dirVec, step));
  }
}

class Matrix {
  constructor(width, height) {
    this.data = [];
    for (let y = 1; y <= height; y++) {
      for (let x = 1; x <= width; x++) {
        this.data[Vec.calcFlatIndex({ x, y })] = null;
      }
    }
  }
  add(cell, coords) {
    let index = Vec.calcFlatIndex(coords);
    this.data[index] = cell;
    return this.data;
  }

  static isDiagonal(posA, posB) {
    let digonalDirs = [
      new Vec(-1, -1),
      new Vec(1, -1),
      new Vec(1, 1),
      new Vec(-1, 1),
    ];
    for (let dir of digonalDirs) {
      if (Vec.isEqual(Vec.sum(posA, dir), posB)) {
        return true;
      }
    }
    return false;
  }

  static isInsideBound(vec, rectSize) {
    return vec.x <= rectSize && vec.x >= 1 && vec.y <= rectSize && vec.y >= 1;
  }

  static findCellByPos(pos, board) {
    return board[Vec.calcFlatIndex(pos)];
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

let pieceMap = [
  [null, null, "A2", null, null, null, null, "A6"], //
  [null, null, "B1", null, null, null, null, null], //
  [null, null, null, "B1", null, "A1", null, null], //
  [null, null, null, null, "A2", null, null, null], //
  [null, null, null, null, null, null, null, null], //
  [null, "B3", null, null, "A4", "B4", "B4", null], //
  ["A2", "A2", "A2", "A2", "A2", "A2", "A2", "A2"], //
  ["A5", "A3", "A4", "A6", "A1", "A4", "A3", "A5"], //
];

// angle based directions
// 0, 45, 90, 135, 180, 225, 270, 315

// new Vec(1, 1), // bottom-right-diagonal
// new Vec(-1, -1), // top-left-diagonal
// new Vec(-1, 1), // botto,-left-diagonal
// new Vec(1, -1), // top-right-diagonal
// new Vec(0, 1), // bottom
// new Vec(1, 0), // right
// new Vec(0, -1), // top
// new Vec(-1, 0), // left

let moveDirections = {
  2: [new Vec(0, -1)],
  3: [new Vec(0, -1), new Vec(0, 1), new Vec(-1, 0), new Vec(1, 0)],
  4: [new Vec(1, 1), new Vec(-1, -1), new Vec(1, -1), new Vec(-1, 1)],
  5: [new Vec(0, 1), new Vec(0, -1), new Vec(1, 0), new Vec(-1, 0)],
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

export class Game {
  constructor() {
    this.board = [];
    pieceMap.map((row, y) =>
      row.map((_, x) => {
        let cell = {
          piece: pieceMap[y][x],
          isValidMove: false,
          coords: new Vec(x + 1, y + 1),
        };
        this.board.push(cell);
      })
    );
  }
}

class MovementSys {
  constructor(cell, board) {
    this.moves = [];
    this.cell = cell;
    let pieceId = Number(this.cell.piece[1]);
    let dirs = moveDirections[pieceId];
    console.log([6].includes(pieceId));
    if ([pieces.queen, pieces.bishop, pieces.rook].includes(pieceId)) {
      this.moves = MovementSys.genLinearMoves(
        cell,
        dirs,
        board,
        boardSize,
        true
      );
    }
    if (pieceId == pieces.pawn) {
      this.moves = MovementSys.genPawnMove(cell, dirs, board);
    }
    if (pieceId == pieces.knight) {
      this.moves = MovementSys.genLShapedMoves(cell, dirs, board);
    }
  }

  static genLinearMoves(cell, directions, board, distance, captureEdge) {
    let moves = [];
    for (let dir of directions) {
      for (let step = 1; step <= distance; step++) {
        let destCoord = Vec.moveTo(cell.coords, dir, step);
        if (!Matrix.isInsideBound(destCoord, boardSize)) break;
        let destCell = Matrix.findCellByPos(destCoord, board);
        let isBlocked = !!destCell.piece;
        let isEnemy = !isEqualTeam(cell.piece, destCell.piece);
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

  static genPawnMove(cell, directions, board) {
    let moves = [];
    let isInitial = cell.coords.y == 7;
    let coordA = Vec.sum(cell.coords, new Vec(-1, -1));
    let coordB = Vec.sum(cell.coords, new Vec(1, -1));
    let diagonalCoords = [coordA, coordB];
    for (let coord of diagonalCoords) {
      if (Matrix.isInsideBound(coord, boardSize)) {
        let pieceA = Matrix.findCellByPos(coord, board).piece;
        let pieceB = cell.piece;
        if (pieceA && !isEqualTeam(pieceA, pieceB)) moves.push(coord);
      }
    }
    let allowTwo = isInitial && moves.length == 0;
    moves.push(
      ...this.genLinearMoves(cell, directions, board, allowTwo ? 2 : 1)
    );
    return moves;
  }

  static genLShapedMoves(cell, directions, board) {
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
}

function isEqualTeam(pieceA, pieceB) {
  return pieceA && pieceB && pieceA[0] == pieceB[0];
}

function createMoves(cell, board) {
  let movementSys = new MovementSys(cell, board);
  return movementSys.moves;
}

function movePiece(currCell, destCell, board) {
  let piece = currCell.piece;
  return board.map((cell, idx) => {
    let isCurrCell = idx == Vec.calcFlatIndex(currCell.coords);
    let isDestCell = idx == Vec.calcFlatIndex(destCell.coords);
    if (isCurrCell) cell.piece = null;
    if (isDestCell) cell.piece = piece;
    return { ...cell, isValidMove: false };
  });
}

Game.prototype.getValidMoves = function (cell) {
  this.board = this.board.map((cell) => ({ ...cell, isValidMove: false }));
  if (!cell.piece) return this.board;
  let moveSys = new MovementSys(cell, this.board);
  moveSys.moves.forEach((move) => {
    this.board[Vec.calcFlatIndex(move)].isValidMove = true;
  });
  return this.board;
};

Game.prototype.movePiece = function (currCell, destCell) {
  let moves = createMoves(currCell, this.board);
  let destCoords = destCell.coords;
  let isValidDest = moves.some((coords) => Vec.isEqual(coords, destCoords));
  if (isValidDest) {
    this.board = movePiece(currCell, destCell, this.board);
  }
  return this.board;
};
