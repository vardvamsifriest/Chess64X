import WebSocket from "ws";
import { Chess } from "chess.js";
import { INIT_GAME, GAME_OVER } from "./message.js";

export class Game {
  private player1: WebSocket;
  private player2: WebSocket;
  private board: Chess;
  private startTime: Date;

  constructor(p1: WebSocket, p2: WebSocket) {
    this.player1 = p1;
    this.player2 = p2;
    this.board = new Chess();
    this.startTime = new Date();

    
    this.player1.send(JSON.stringify({
      type: INIT_GAME,
      payload: { color: "white" }
    }));

    this.player2.send(JSON.stringify({
      type: INIT_GAME,
      payload: { color: "black" }
    }));
  }

  hasPlayer(socket: WebSocket): boolean {
    return socket === this.player1 || socket === this.player2;
  }

  makeMove(
    socket: WebSocket,
    move: { from: string; to: string }
  ) {
    
    const turn = this.board.turn(); 

    if (turn === "w" && socket !== this.player1) 
        return;
    if (turn === "b" && socket !== this.player2) 
        return;

    
    const result = this.board.move(move);
    if (!result) return;

   
    const message = JSON.stringify({
      type: "MOVE",
      payload: move
    });

    this.player1.send(message);
    this.player2.send(message);

    
    if (this.board.isGameOver()) {
      const winner = this.board.turn() === "w" ? "black" : "white";

      const gameOverMsg = JSON.stringify({
        type: GAME_OVER,
        payload: { winner }
      });

      this.player1.send(gameOverMsg);
      this.player2.send(gameOverMsg);
    }
  }
}
