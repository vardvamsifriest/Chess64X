import { WebSocket } from "ws";
import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./message.js";

export class GameManager {
  private games: Game[] = [];
  private pendingUser: WebSocket | null = null;
  private users: WebSocket[] = [];

  addUser(socket: WebSocket) {
    this.users.push(socket);
    
    socket.on("message", (data) => this.handleMessage(socket, data));
    socket.on("close", () => this.removeUser(socket));
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((u) => u !== socket);
    
    if (this.pendingUser === socket) {
      this.pendingUser = null;
    }

    const game = this.games.find((g) => g.hasPlayer(socket));
    if (game) {
      this.games = this.games.filter((g) => g !== game);
    }
  }

  private handleMessage(socket: WebSocket, data: WebSocket.Data) {
    let msg;
    try {
      msg = JSON.parse(data.toString());
    } catch (err) {
      return;
    }

    if (msg.type === INIT_GAME) {
      const existingGame = this.games.find((g) => g.hasPlayer(socket));
      if (existingGame) return;

      if (this.pendingUser === socket) return;
      
      if (this.pendingUser && this.pendingUser !== socket) {
        const game = new Game(this.pendingUser, socket);
        this.games.push(game);
        this.pendingUser = null;
      } else {
        this.pendingUser = socket;
      }
    }

    if (msg.type === MOVE) {
      const game = this.games.find((g) => g.hasPlayer(socket));
      if (game) {
        game.makeMove(socket, msg.payload);
      }
    }
  }
}