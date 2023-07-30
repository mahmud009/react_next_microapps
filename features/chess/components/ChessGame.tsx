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
      backgroundColor={theme.colors["base-100"]}
    >
      <Board
        board={board}
        moves={lastSelection?.moves ? lastSelection.moves : []}
        onClickCell={handleCellClick}
        theme={chessTheme}
      />
    </Box>
  );
}

function createChessTheme(): ChessTheme {
  return {
    cellSize: 48,
    pieceSize: 42,
    highlighterSize: 30,
    colors: {
      cell: {
        light: `#333446`,
        dark: `#1C1D31`,
      },
      piece: {
        light: `#84C69B`,
        dark: `#7B6CF6`,
      },
      validCell: "#A52A2A",
    },
  };
}
