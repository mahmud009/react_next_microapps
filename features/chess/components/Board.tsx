import { Box, Text } from "@/reusables/components";
import { Piece } from "../chess";
import { v4 as uuid } from "uuid";
import { Vec } from "../utils.math";
import { getPieceData } from "../utils";
import { PieceData, ChessTheme } from "../types";

interface Props {
  board: (string | null)[];
  theme: ChessTheme;
  moves: Vec[];
  onClickCell: (cellCoord: Vec, pieceCode?: string) => void;
}

export function Board(props: Props) {
  const { board, theme, onClickCell, moves } = props;

  return (
    <Box
      width={`${theme.cellSize * 8 + 2}px`}
      height={`${theme.cellSize * 8}`}
      display="grid"
      gridTemplateColumns={`repeat(${8}, 1fr)`}
      gridTemplateRows={`repeat(${8}, 1fr)`}
      border="1px solid #ffffff"
      gap={"0px"}
    >
      {board.map((cell, idx) => {
        let cellX = idx % 8;
        let cellY = Math.floor(idx / 8);
        const cellCoord = new Vec(cellX, cellY);
        let piece: PieceData = Object.create(null);
        if (cell) {
          piece = getPieceData(cell, new Vec(cellX, cellY));
        }

        return (
          <Box
            key={uuid()}
            width={`${theme.cellSize}px`}
            height={`${theme.cellSize}px`}
            backgroundColor={
              (cellX + cellY) % 2 == 0
                ? theme.colors.cell.light
                : theme.colors.cell.dark
            }
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            lineHeight={1}
            position="relative"
            onClick={() => onClickCell(cellCoord, piece?.code)}
            cursor={piece ? "pointer" : "inherit"}
          >
            {piece ? (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform={"translate(-50%, -50%)"}
                fontSize={`${theme.pieceSize}px`}
                color={
                  piece.group == "A"
                    ? theme.colors.piece.light
                    : theme.colors.piece.dark
                }
                height={"fit-content"}
                pointerEvents="none"
                fontFamily="Poppins"
              >
                {piece?.type == 1 ? <>&#9818;</> : null}
                {piece?.type == 2 ? <>&#9823;</> : null}
                {piece?.type == 3 ? <>&#9822;</> : null}
                {piece?.type == 4 ? <>&#9821;</> : null}
                {piece?.type == 5 ? <>&#9820;</> : null}
                {piece?.type == 6 ? <>&#9819;</> : null}
              </Box>
            ) : null}

            {moves.some((move: any) => move.x == cellX && move.y == cellY) ? (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width={`${theme.highlighterSize}px`}
                height={`${theme.highlighterSize}px`}
                borderRadius={"50%"}
                opacity="0.5"
                border="1px solid"
                borderColor={theme.colors.validCell}
                boxShadow={`1px 1px 8px 1px inset ${theme.colors.validCell}, -1px -1px 8px 1px inset ${theme.colors.validCell} `}
              />
            ) : null}
            <Box position="absolute" bottom={"0"} right="0">
              <Text
                fontSize={"12px"}
                lineHeight="1"
                margin={0}
                color={theme.colors.validCell}
              >
                {cellX}, {cellY}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

// Menlo, Monaco, 'Courier New', monospace
