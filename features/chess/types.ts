import { Vec } from "./utils.math";

export interface ChessTheme {
  cellSize: number;
  pieceSize: number;
  highlighterSize: number;
  colors: {
    cell: {
      light: string;
      dark: string;
    };
    piece: {
      light: string;
      dark: string;
    };
    validCell: "#A52A2A";
  };
}

export interface PieceData {
  code: string;
  type: number;
  group: string;
  coord: Vec;
}
