import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";

export function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("Socket OPEN");
      setSocket(ws);           // ✅ THIS is the fix
    };

    ws.onclose = () => {
      console.log("Socket CLOSED");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
}
