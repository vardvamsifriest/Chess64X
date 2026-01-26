import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App";
import { SocketProvider } from "./socketprovider";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <SocketProvider>
    
      <App />
    
  </SocketProvider>
);
