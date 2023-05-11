import { Vec } from "./utils.math";
import { moveDirections, boardSize } from "./static";

export function validDest(from, to, board) {
  if (board.isInside(to)) {
    let piece = board.get(from);
    let destCell = board.get(to);
    let isBlocked = destCell && destCell.type;
    let isEnemy = isBlocked && piece?.group !== destCell?.group;
    return { isBlocked, isEnemy, isInside: true };
  } else {
    return { isBlocked: false, isEnemy: false, isInside: false };
  }
}

export function rayTraceCells(board, pos, dirs, dist, canCapture = true) {
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

export function pawnMoves(piece, dirs, board) {
  let isInitial = piece.coord.y == 6;
  if (piece.group == "B") isInitial = piece.coord.y == 1;
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

export function knightMoves(piece, directions, board) {
  let moves = [];
  directions.map((dir) => {
    let edgeCoord = piece.coord.add(dir.multiply(2));
    let isHoriz = edgeCoord.x == piece.coord.x;
    for (let step = -1; step <= 1; step += 2) {
      let stepVec = new Vec(isHoriz ? step : 0, isHoriz ? 0 : step);
      let destCoord = edgeCoord.add(stepVec);
      let { isBlocked, isEnemy } = validDest(piece.coord, destCoord, board);
      if (!isBlocked || isEnemy) moves.push(destCoord);
    }
  });
  return moves;
}

export function createMoves(piece, board) {
  let moves = [];
  let directions = moveDirections[piece.type].map((dir) => {
    return new Vec(dir[0], dir[1]);
  });
  if (piece.type > 3 || piece.type == 1) {
    let dist = piece.type == 1 ? 1 : boardSize;
    moves = rayTraceCells(board, piece.coord, directions, dist);
  }
  if (piece.type == 3) {
    moves = knightMoves(piece, directions, board);
  }
  if (piece.type == 2) {
    if (piece.group == "B") {
      directions = directions.map((vec) => vec.rotate());
    }
    console.log(directions);
    moves = pawnMoves(piece, directions, board);
  }

  return moves;
}
