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
  [null, null, null, null, null, null, null, null], //
  [null, null, null, null, null, null, null, null], //
  ["A1", null, null, null, null, null, null, null], //
  [null, "B1", "B2", "B3", "B4", "B5", "B6", null], //
  [null, null, null, null, null, null, null, null], //
  [null, null, null, null, null, null, null, null], //
  [null, "A1", "A2", "A3", "A4", "A5", "A6", null], //
  [null, null, null, null, null, null, null, null], //
];

// prettier-ignore
export let moveDirections = {
  1: [[1, 1], [-1, -1], [-1, 1], [1, -1], [0, 1], [1, 0], [-1, 0],[0, -1]],
  2: [[1, - 1], [-1, -1], [0, -1]  ],
  3: [[0, -1], [0, 1], [-1, 0], [1, 0]],
  4: [[1, 1], [-1, -1], [1, -1], [-1, 1]],
  5: [[0, 1], [0, -1], [1, 0], [-1, 0]],
  6: [[1, 1], [-1, -1], [-1, 1], [1, -1], [0, 1], [1, 0], [-1, 0], [0, -1]],
};
// prettier-ignore
