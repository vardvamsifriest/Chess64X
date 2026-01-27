import { useSharedSocket } from "../context/socketcontext";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface CardProps {
  title: string;
  showbutton: boolean;
}

export function Card({ title, showbutton }: CardProps) {
  const socket = useSharedSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (e: MessageEvent) => {
      const msg = JSON.parse(e.data);
      
      if (msg.type === "init_game") {
        navigate("/game");
      }
    };

    socket.addEventListener("message", handleMessage);
    return () => socket.removeEventListener("message", handleMessage);
  }, [socket, navigate]);

  const joinRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "init_game" }));
      navigate("/waiting");
    }
  };

  return (
    <div className="bg-amber-50 h-100 w-100 grid place-content-center outline-2 shadow-md outline-yellow-800">
      <p className="font-mono text-md font-semibold">{title}</p>
      {showbutton && (
        <div className="pt-60">
          <Button size="lg" variant="primary" text="JOIN ROOM" onClick={joinRoom} />
        </div>
      )}
    </div>
  );
}