import React, { useState } from "react";
import { Box, Text } from "@/reusables/components";
import { v4 as uuid } from "uuid";
import { game, Piece } from "./chess";
import { createMoves } from "./utils.move";
import { useTheme } from "@/reusables/hooks";

let cellSize = 48;
let pieceSize = 42;
let highlighterSize = 30;
let colors = {
  cell: {
    light: `#333446`,
    dark: `#1C1D31`,
  },
  piece: {
    light: `#84C69B`,
    dark: `#7B6CF6`,
  },
  validCell: "#A52A2A",
};

export function ChessGame() {
  const theme = useTheme();
  const [board, setBoard] = useState(game.board.content);
  const [lockedCell, setLockedCell] = useState<any>(null);
  const [moves, setMoves] = useState<any>([]);

  // React.useEffect(() => {
  //   setBoard(game.board);
  // }, []);

  // const handleMove = (cell: any) => {
  //   if (lockedCell) {
  //     let board = game.movePiece(lockedCell, cell);
  //     setBoard(board);
  //     setLockedCell(null);
  //     return;
  //   }
  //   let board = game.getValidMoves(cell);
  //   setLockedCell(cell.piece ? cell : null);
  //   setBoard([...board]);
  // };

  const handleCellClick = (piece: null | Piece) => {
    if (!piece) return;
    let moves = createMoves(piece, game.board);
    setMoves(moves);
  };

  return (
    <Box
      fontFamily={"Poppins"}
      width="100%"
      height="100vh"
      overflow={"hidden"}
      display="flex"
      alignItems={"center"}
      justifyContent="center"
      backgroundColor={theme.colors["base-100"]}
    >
      {/* board */}
      <Box
        width={`${cellSize * 8}px`}
        height={`${cellSize * 8}`}
        display="grid"
        gridTemplateColumns={`repeat(${8}, 1fr)`}
        gridTemplateRows={`repeat(${8}, 1fr)`}
        border="1px solid #405266"
      >
        {board.length > 0
          ? board.map((cell: Piece | null, idx) => {
              let cellX = idx % 8;
              let cellY = Math.floor(idx / 8);
              let piece = cell;

              return (
                <Box
                  key={uuid()}
                  width={`${cellSize}px`}
                  height={`${cellSize}px`}
                  backgroundColor={
                    (cellX + cellY) % 2 == 0
                      ? colors.cell.light
                      : colors.cell.dark
                  }
                  display="flex"
                  justifyContent={"center"}
                  alignItems="center"
                  lineHeight={1}
                  position="relative"
                  onClick={() => handleCellClick(cell)}
                  cursor={piece ? "pointer" : "inherit"}
                >
                  {piece ? (
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform={"translate(-50%, -50%)"}
                      fontSize={`${pieceSize}px`}
                      color={
                        piece.group == "A"
                          ? colors.piece.light
                          : colors.piece.dark
                      }
                      pointerEvents="none"
                    >
                      {piece?.type == 1 ? <>&#9818;</> : null}
                      {piece?.type == 2 ? <>&#9823;</> : null}
                      {piece?.type == 3 ? <>&#9822;</> : null}
                      {piece?.type == 4 ? <>&#9821;</> : null}
                      {piece?.type == 5 ? <>&#9820;</> : null}
                      {piece?.type == 6 ? <>&#9819;</> : null}
                    </Box>
                  ) : null}

                  {moves.some(
                    (move: any) => move.x == cellX && move.y == cellY
                  ) ? (
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      width={`${highlighterSize}px`}
                      height={`${highlighterSize}px`}
                      borderRadius={"50%"}
                      opacity="0.5"
                      border="1px solid"
                      borderColor={colors.validCell}
                      boxShadow={`1px 1px 8px 1px inset ${colors.validCell}, -1px -1px 8px 1px inset ${colors.validCell} `}
                    />
                  ) : null}
                  <Box position="absolute" bottom={"0"} right="0">
                    <Text
                      fontSize={"12px"}
                      lineHeight="1"
                      margin={0}
                      color={colors.validCell}
                    >
                      {cellX}, {cellY}
                    </Text>
                  </Box>
                </Box>
              );
            })
          : null}
      </Box>
    </Box>
  );
}
