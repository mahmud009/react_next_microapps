import { PieceData } from "./types";
import { Vec } from "./utils.math";

export function getPieceData<T extends PieceData>(
  pieceCode: string,
  coord: Vec
): T {
  let data: T = Object.create(null);
  data.code = pieceCode;
  data.type = Number(pieceCode[1]);
  data.group = pieceCode[0];
  data.coord = coord;
  return data;
}
