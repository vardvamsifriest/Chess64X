import { createContext, useContext, useRef, useEffect } from "react";

const SocketContext = createContext<WebSocket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<WebSocket | null>(null);

  if (!socketRef.current) {
    socketRef.current = new WebSocket("ws://localhost:8080");

    socketRef.current.onopen = () => console.log("Socket connected (provider)");
    socketRef.current.onclose = () => console.log("Socket disconnected (provider)");
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
