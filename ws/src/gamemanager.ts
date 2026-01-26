import { INIT_GAME, MOVE } from "./message.js";
import { Game } from "./Game.js";
import WebSocket from "ws";

export class GameManager {
  private games: Game[] = [];
  private pendingUser: WebSocket | null = null;
  private users: WebSocket[] = [];

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);

  }
  removeUser(socket: WebSocket) {
    this.users = this.users.filter(user => user !== socket);
    if (this.pendingUser === socket) {
      this.pendingUser = null;
    }


    const game = this.games.find(g => g.hasPlayer(socket));
    if (game) {
      this.games = this.games.filter(g => g !== game);
    }
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      let message;
      try {
        message = JSON.parse(data.toString());
      } catch {
        return;
      }

    
      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
            console.log("Matchfound")
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
            console.log("user in queue")
          this.pendingUser = socket;
        }
      }

     
      if (message.type === MOVE && message.move) {
        const game = this.games.find(g => g.hasPlayer(socket));
        if (game) {
          game.makeMove(socket, message.move);
        }
      }
    });
  }
}

