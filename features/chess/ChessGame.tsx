import React, { useState } from "react";
import { Box } from "components/reusables";
import { v4 as uuid } from "uuid";
import { FaChessPawn, FaChessQueen } from "react-icons/fa";
import { Text } from "components/reusables/Text";
import { Game } from "./chess";

let cellSize = 64;
let pieceSize = 56;
let highlighterSize = 42;
let game = new Game();
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
  const [board, setBoard] = useState<any[]>([]);
  const [lockedCell, setLockedCell] = useState<any>(null);

  React.useEffect(() => {
    setBoard(game.board);
  }, []);

  const handleMove = (cell: any) => {
    if (lockedCell) {
      let board = game.movePiece(lockedCell, cell);
      setBoard(board);
      setLockedCell(null);
      return;
    }
    let board = game.getValidMoves(cell);
    setLockedCell(cell.piece ? cell : null);
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
              let piece = cell.piece ? cell.piece[1] : null;
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
                  cursor={piece ? "pointer" : "inherit"}
                >
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform={"translate(-50%, -50%)"}
                    fontSize={`${pieceSize}px`}
                    color={
                      pieceTeam == "A" ? colors.piece.light : colors.piece.dark
                    }
                    pointerEvents="none"
                  >
                    {piece == 1 ? <>&#9818;</> : null}
                    {piece == 2 ? <>&#9823;</> : null}
                    {piece == 3 ? <>&#9822;</> : null}
                    {piece == 4 ? <>&#9821;</> : null}
                    {piece == 5 ? <>&#9820;</> : null}
                    {piece == 6 ? <>&#9819;</> : null}
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
