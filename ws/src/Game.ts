import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { INIT_GAME, MOVE, GAME_OVER } from "./message.js";

export class Game {
  player1: WebSocket;
  player2: WebSocket;
  board: Chess;
  
  constructor(p1: WebSocket, p2: WebSocket) {
    this.player1 = p1;
    this.player2 = p2;
    this.board = new Chess();

    this.player1.send(JSON.stringify({ type: INIT_GAME, payload: { color: "white" } }));
    this.player2.send(JSON.stringify({ type: INIT_GAME, payload: { color: "black" } }));
  }

  hasPlayer(socket: WebSocket) {
    return socket === this.player1 || socket === this.player2;
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    const turn = this.board.turn() === "w" ? this.player1 : this.player2;
    
    if (socket !== turn) return;

    const result = this.board.move(move);
    
    if (!result) return;

    const other = socket === this.player1 ? this.player2 : this.player1;
    other.send(JSON.stringify({ type: MOVE, payload: move }));

    if (this.board.isGameOver()) {
      const winner = this.board.turn() === "w" ? "black" : "white";
      this.player1.send(JSON.stringify({ type: GAME_OVER, payload: { winner } }));
      this.player2.send(JSON.stringify({ type: GAME_OVER, payload: { winner } }));
    }
  }
}