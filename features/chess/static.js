export let boardSize = 8;
export let teamPrefix = ["A", "B"];
export let pieces = {
  king: 1,
  pawn: 2,
  knight: 3,
  bishop: 4,
  rook: 5,
  queen: 6,
};

export let pieceMap = [
  [null, null, "A2", null, null, null, null, "A6"], //
  [null, null, "B1", null, null, null, null, null], //
  [null, null, null, null, null, null, null, null], //
  [null, null, null, null, "A6", null, null, null], //
  [null, null, null, null, null, null, null, null], //
  [null, "B3", null, null, "A4", "B4", "B4", null], //
  ["A2", "A2", "A2", "A2", "A2", "A2", "A2", "A2"], //
  ["A5", "A3", "A4", "A6", "A1", "A4", "A3", "A5"], //
];

//prettier-ignore
export let moveDirections = {
  2: [[0, -1]],
  3: [[0, -1], [0, 1], [-1, 0], [1, 0]],
  4: [[0, -1], [-1, -1], [1, -1], [-1, 1]],
  5: [[0, 1], [0, -1], [1, 0], [-1, 0]],
  6: [[1, 1], 
  [-1, -1], [-1, 1], [1, -1], [0, 1], [1, 0], [0, -1], [-1, 0]
],
};
