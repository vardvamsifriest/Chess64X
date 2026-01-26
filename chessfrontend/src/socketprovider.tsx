import { createContext, useContext, useRef } from "react";

const SocketContext = createContext<WebSocket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<WebSocket | null>(null);

  if (!socketRef.current) {
    console.log("🧠 Creating SINGLE socket");

    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => console.log("Socket OPEN");
    ws.onclose = () => console.log(" Socket CLOSED");
    ws.onerror = (e) => console.log(" Socket ERROR", e);

    socketRef.current = ws;
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSharedSocket() {
  return useContext(SocketContext);
}
