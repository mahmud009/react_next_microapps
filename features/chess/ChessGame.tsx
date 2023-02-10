import React, { useState } from "react";
import { Box } from "components/reusables";
import { v4 as uuid } from "uuid";
import { FaChessPawn, FaChessQueen } from "react-icons/fa";
import { Text } from "components/reusables/Text";
import { Game } from "./chess";

let cellSize = 64;
let pieceSize = 42;
let highlighterSize = 42;
let game = new Game();
let colors = {
  cell: {
    light: `#333446`,
    dark: `#1C1D31`,
  },
  piece: {
    light: `#2CD9A1`,
    dark: `#F86A9A`,
  },
  validCell: "#A52A2A",
};

export function ChessGame() {
  const [board, setBoard] = useState<any[]>([]);

  React.useEffect(() => {
    setBoard(game.board);
  }, []);

  const handleMove = (cell: any) => {
    let board = game.getValidMoves(cell);
    setBoard([...board]);
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
          ? board.map((cell, idx) => {
              let coords = cell.coords;
              let piece = cell.piece[1];
              let isDark = (coords.x + coords.y) % 2 == 0;
              let pieceTeam = "";
              if (piece) pieceTeam = cell.piece[0];

              return (
                <Box
                  key={uuid()}
                  width={`${cellSize}px`}
                  height={`${cellSize}px`}
                  backgroundColor={
                    isDark ? colors.cell.light : colors.cell.dark
                  }
                  display="flex"
                  justifyContent={"center"}
                  alignItems="center"
                  lineHeight={1}
                  position="relative"
                  onClick={() => handleMove(cell)}
                >
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform={"translate(-50%, -50%)"}
                    fontSize={`${pieceSize}px`}
                    color={
                      pieceTeam == "A" ? colors.piece.dark : colors.piece.light
                    }
                  >
                    {piece == 2 ? <FaChessPawn /> : null}
                    {piece == 6 ? <FaChessQueen /> : null}
                  </Box>
                  {cell.isValidMove ? (
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
                      {coords.x}, {coords.y}
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
