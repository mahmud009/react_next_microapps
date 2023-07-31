import React, { useState } from "react";
import { Box, Text } from "@/reusables/components";
import { v4 as uuid } from "uuid";
import { Game } from "../chess";
import { createMoves, getValidMoves } from "../utils.move";
import { useTheme } from "@/reusables/hooks";
import { Board } from "./Board";
import { ChessTheme, PieceData } from "../types";
import { Vec } from "../utils.math";

const game = new Game();

export function ChessGame() {
  const theme = useTheme();
  const chessTheme = createChessTheme();
  const [board, setBoard] = useState(game.board.content);
  const [lastSelection, setLastSelection] = React.useState<null | {
    pieceCode: string;
    coord: Vec;
    moves: Vec[];
  }>(null);

  const handleCellClick = (coord: Vec, pieceCode?: string) => {
    if (!pieceCode && coord && lastSelection) {
      let isValidCoord = lastSelection.moves.some((itm) => itm.isEqual(coord));
      if (isValidCoord) {
        game.update(lastSelection.pieceCode, lastSelection?.coord, coord);
        setBoard(game.board.content);
        setLastSelection(null);
      } else {
        setLastSelection(null);
      }
    }

    if (pieceCode) {
      let moves = getValidMoves(pieceCode, coord, game.board);
      setLastSelection({ pieceCode, coord, moves });
    }
  };

  return (
    <Box
      fontFamily={"Poppins !important"}
      width="100%"
      height="100vh"
      display="flex"
      alignItems={"center"}
      justifyContent="center"
      backgroundColor={chessTheme.colors.background}
    >
      <Board
        board={board}
        moves={lastSelection?.moves ? lastSelection.moves : []}
        onClickCell={handleCellClick}
        theme={chessTheme}
        // isCellCoordsVisible
      />
    </Box>
  );
}

function createChessTheme(): ChessTheme {
  return {
    cellSize: 84,
    pieceSize: 48,
    highlighterSize: 30,
    colors: {
      cell: {
        light: `#757575`,
        dark: `#424242`,
      },
      piece: {
        light: {
          body: `#F4F7FA`,
          stroke: "#34364C",
        },
        dark: {
          body: "#34364C",
          stroke: "#F4F7FA",
        },
      },
      background: "#202124",
      validCell: "#A52A2A",
    },
  };
}
