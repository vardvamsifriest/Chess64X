import { useState } from "react";
import type { Square } from "chess.js";
import { pieces } from "./piece";

interface Props {
  board: any[][];
  onMove: (from: string, to: string) => boolean | void;
  orientation: "white" | "black";
}

export function Chessboard({ board, onMove, orientation }: Props) {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  // Flip board for black
  const displayBoard =
    orientation === "black" ? [...board].reverse() : board;

  function getSquare(i: number, j: number): Square {
    const files = "abcdefgh";
    const file =
      orientation === "black" ? files[7 - j] : files[j];
    const rank =
      orientation === "black" ? i + 1 : 8 - i;
    return (file + rank) as Square;
  }

  function handleClick(i: number, j: number) {
    const square = getSquare(i, j);

    if (!selectedSquare) {
      if (displayBoard[i][j]) setSelectedSquare(square);
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    const moved = onMove(selectedSquare, square);
    if (moved !== false) {
      setSelectedSquare(null);
    }
  }

  return (
    <div>
      {displayBoard.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const isDark = (i + j) % 2 === 1;
            const sq = getSquare(i, j);

            return (
              <div
                key={j}
                onClick={() => handleClick(i, j)}
                className={`w-14 h-14 flex items-center justify-center
                  ${isDark ? "bg-yellow-700" : "bg-amber-50"}
                  ${selectedSquare === sq ? "ring-4 ring-yellow-800" : ""}
                  cursor-pointer
                `}
              >
                {square && (
                  <img
                    src={pieces[
                      square.color === "w"
                        ? square.type.toUpperCase()
                        : square.type
                    ]}
                    className="w-8 h-8 pointer-events-none"
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
