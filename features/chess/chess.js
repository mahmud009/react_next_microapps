class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static isEqual(vec1, vec2) {
    return vec1.x == vec2.x && vec1.y == vec2.y;
  }

  static isDiagonal(matrix) {
    // Check if the input is a square matrix
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    if (numRows !== numCols) {
      return false;
    }

    // Check if all non-diagonal elements are zero
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (i !== j && matrix[i][j] !== 0) {
          return false;
        }
      }
    }

    // If all non-diagonal elements are zero, return true
    return true;
  }

  static sum(...vectors) {
    let sum = new Vec(0, 0);
    vectors.forEach((vector) => {
      sum.x += vector.x;
      sum.y += vector.y;
    });
    return sum;
  }

  static isInsideRectBound(vec, rect) {
    return vec.x <= rect.x && vec.y <= rect.y && vec.x >= 1 && vec.y >= 1;
  }

  static calcFlatIndex(vec) {
    return (vec.y - 1) * boardSize + vec.x - 1;
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
  [null, null, "A2", null, null, null, null, null], //
  [null, null, "B1", null, null, null, null, null], //
  [null, null, null, null, null, null, null, null], //
  [null, null, null, null, "A5", null, null, null], //
  [null, "A1", null, "B5", null, null, null, null], //
  [null, null, null, null, null, null, "A1", null], //
  ["A2", "A2", "A2", "A2", "A2", "A2", "A2", "A2"], //
  ["A5", "A3", "A4", "A6", "A1", "A4", "A3", "A5"], //
];

let moveDirections = {
  2: [new Vec(0, -1)],
  4: [new Vec(1, 1), new Vec(-1, -1), new Vec(1, -1), new Vec(-1, 1)],
  5: [new Vec(0, 1), new Vec(0, -1), new Vec(1, 0), new Vec(-1, 0)],
  6: [
    new Vec(1, 1), // bottom-right-diagonal
    new Vec(-1, -1), // top-left-diagonal
    new Vec(-1, 1), // botto,-left-diagonal
    new Vec(1, -1), // top-right-diagonal
    new Vec(0, 1), // bottom
    new Vec(1, 0), // right
    new Vec(0, -1), // top
    new Vec(-1, 0), // left
  ],
};

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

  static isInsideRectBound(vec, rect) {
    return vec.x <= rect.x && vec.y <= rect.y && vec.x >= 1 && vec.y >= 1;
  }
}

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

function createMoves(cell, board) {
  let moves = [];
  let pieceId = Number(cell.piece[1]);
  let pieceTeam = cell.piece[0];
  let boardRect = new Vec(boardSize, boardSize);
  let directions = moveDirections[pieceId];

  if (
    pieceId == pieces.queen ||
    pieceId == pieces.bishop ||
    pieceId == pieces.rook
  ) {
    directions.forEach((direction) => {
      let nextCell = Vec.sum(cell.coords, direction);
      while (Vec.isInsideRectBound(nextCell, boardRect)) {
        let cellIndex = Vec.calcFlatIndex(nextCell);
        let blockedPiece = board[cellIndex].piece;
        if (blockedPiece) {
          let isSameTeam = blockedPiece[0] == pieceTeam;
          if (isSameTeam) break;
          moves.push(nextCell);
          break;
        }
        moves.push(nextCell);
        nextCell = Vec.sum(nextCell, direction);
      }
    });
  }

  if (pieceId == pieces.pawn) {
    let isInitial = cell.coords.y == 7;
    let diagonalCells = {
      topLeftCell:
        board[Vec.calcFlatIndex(Vec.sum(cell.coords, new Vec(1, -1)))],
      topRightCell:
        board[Vec.calcFlatIndex(Vec.sum(cell.coords, new Vec(-1, 1)))],
    };
    console.log(diagonalCells);
    directions.forEach((direction) => {
      let coordsQueue = [];
      coordsQueue.push(Vec.sum(cell.coords, direction));
      if (isInitial) {
        coordsQueue.push(Vec.sum(cell.coords, direction));
      }
      coordsQueue.forEach((coords) => {
        if (Vec.isInsideRectBound(coords, boardRect)) {
          moves.push(coords);
        }
      });
    });
  }

  return moves;
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
  let moves = createMoves(cell, this.board);
  moves.forEach((move) => {
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
