import { WebSocketServer } from "ws";
import WebSocket from "ws";
import { GameManager } from "./gamemanager.js";

const wss = new WebSocketServer({ port: 8080 });
const gamemanager = new GameManager();

wss.on("connection", (ws: WebSocket) => {
  gamemanager.addUser(ws);
  console.log("client connected")
  ws.on("close", () => {
    gamemanager.removeUser(ws);
    console.log("client disconnected")
  });
});
