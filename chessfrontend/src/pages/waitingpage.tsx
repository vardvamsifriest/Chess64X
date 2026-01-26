import { Logo } from "../components/logo";
import { Card } from "../components/dashcard";
import { useSharedSocket } from "../socketprovider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function WaitingPage() {
  const socket = useSharedSocket();
  const navigate = useNavigate();

 useEffect(() => {
  if (!socket) return;

  const handler = (event: MessageEvent) => {
    const msg = JSON.parse(event.data);

    if (msg.type === "INIT_GAME") {
      navigate("/game");
    }
  };

  socket.addEventListener("message", handler);
  return () => socket.removeEventListener("message", handler);
}, [socket]);



  return (
    <div className="bg-yellow-100 h-screen w-full">
      <div className="h-24 w-full bg-amber-50 relative flex items-center">
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-10">
          <Logo size={"sm"} showtagline={false} />
        </div>
      </div>
      <div className="pt-30 grid place-content-center">
        <Card title="WAITING FOR PLAYER TO JOIN" showbutton={false} />
      </div>
    </div>
  );
}
