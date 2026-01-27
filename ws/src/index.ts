import { WebSocketServer } from "ws";
import WebSocket from "ws";
import { GameManager } from "./gamemanager.js";

const wss = new WebSocketServer({ port: 8080 });
const gamemanager = new GameManager();

wss.on("connection", (ws: WebSocket) => {
  gamemanager.addUser(ws);
 
  ws.on("close", () => {
    gamemanager.removeUser(ws);
    
  });
});
