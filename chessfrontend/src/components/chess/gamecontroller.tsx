import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "./chessboard";
import { useSharedSocket } from "../../hooks/socketcontext";

type Color = "white" | "black";

export function GameController() {
  const [chess, setChess] = useState(new Chess());
  const socket = useSharedSocket();

  const [myColor, setMyColor] = useState<Color>("white");
  const [isMyTurn, setIsMyTurn] = useState(true);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (e: MessageEvent) => {
      const msg = JSON.parse(e.data);
      
      if (msg.type === "init_game") {
        setMyColor(msg.payload.color);
        setIsMyTurn(msg.payload.color === "white");
      }
      
      if (msg.type === "move") {
        setChess((prevChess) => {
          const newChess = new Chess(prevChess.fen());
          newChess.move(msg.payload);
          return newChess;
        });
        setIsMyTurn(true);
      }
      
      if (msg.type === "game_over") {
        alert(`Game Over! Winner: ${msg.payload.winner}`);
      }
    };

    socket.addEventListener("message", handleMessage);
    
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  const MakeMove = (from: string, to: string) => {
    if (!isMyTurn || !socket) return false;

    const tempChess = new Chess(chess.fen());
    const move = tempChess.move({ from, to });
    
    if (!move) return false;

    setChess(tempChess);
    socket.send(JSON.stringify({ type: "move", payload: { from, to } }));
    setIsMyTurn(false);
    
    return true;
  };

  return (
    <Chessboard
      board={chess.board()}
      onMove={MakeMove}
      orientation={myColor}
    />
  );
}