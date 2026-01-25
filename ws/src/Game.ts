import {WebSocket} from "ws"
import {Chess} from "chess.js"
import { INIT_GAME } from "./message.js";
import {GAME_OVER} from "./message.js"

const chess = new Chess();
export class Game {
    private starttime : Date;
    private player1: WebSocket;
    private player2 :WebSocket;
    private board :Chess;
    private moves : string[];

    constructor(p1:WebSocket , p2:WebSocket){
        this.player1=p1;
        this.player2=p2;
        this.board=new Chess();
        this.moves= [];
        this.starttime = new Date();
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
    };
    hasPlayer(socket: WebSocket): boolean {
    return (socket === this.player1 || socket === this.player2);
  }
     makeMove(socket:WebSocket,move:{
        from:string;
        to:string;
    })
    {
        if(this.board.move.length % 2 == 0 && socket !== this.player1)
        {
            return
        }
        if(this.board.move.length % 2 == 0 && socket !== this.player2){
            return
        }
        try{
        this.board.move(move);
        }catch(e){
            return;
        }
        if (this.board.isGameOver())
        {
            this.player1.emit(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner: this.board.turn() =="w" ? "black":"white"
                }
            }))
            return
            
        }
        if(this.board.moves.length % 2==0){
            this.player2.send(JSON.stringify({
                type:"move",
                payload:move
            }))
        }else{
            this.player1.send(JSON.stringify({
                type:"move",
                payload:move
            }))
        }
    }
}