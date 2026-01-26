import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { Chessboard } from "./chessboard";

type Color = "white" | "black";

export function GameController() {
  const chessRef = useRef(new Chess());
  const socketRef = useRef<WebSocket | null>(null);

  const [board, setBoard] = useState(chessRef.current.board());
  const [myColor, setMyColor] = useState<Color>("white");
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "INIT_GAME" }));
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "INIT_GAME") {
        setMyColor(msg.payload.color);
        setIsMyTurn(msg.payload.color === "white");
      }

      if (msg.type === "MOVE") {
        chessRef.current.move(msg.payload);
        setBoard(chessRef.current.board()); // 🔥 REQUIRED
        setIsMyTurn(true);
      }
    };

    return () => socket.close();
  }, []);

  function MakeMove(from: string, to: string) {
    if (!isMyTurn) return;

    const move = chessRef.current.move({ from, to });
    if (!move) return;

    socketRef.current?.send(
      JSON.stringify({ type: "MOVE", payload: { from, to } })
    );

    setBoard(chessRef.current.board()); // 🔥 REQUIRED
    setIsMyTurn(false);
  }

  return (
    <Chessboard
      board={board}
      onMove={MakeMove}
      orientation={myColor ?? "white"}
    />
  );
}
