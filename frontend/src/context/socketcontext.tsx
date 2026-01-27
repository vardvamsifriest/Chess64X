// socketcontext.tsx - CLEAN
import { createContext, useContext, useEffect, useState } from "react";

interface SocketContextType {
  socket: WebSocket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export function useSharedSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSharedSocket must be used within SocketProvider");
  }
  return context.socket;
}

export function SocketProvider({ children }: { children: any }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    
    ws.onopen = () => {
      setSocket(ws);
    };
    
    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}