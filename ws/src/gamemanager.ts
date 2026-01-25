
import { INIT_GAME } from "./message.js";
import { MOVE } from "./message.js";
import {Game} from "./Game.js"
import WebSocket from "ws";


 
export class GameManager {
    private game : Game[];
    private pendinguser : WebSocket | null;
    private users: WebSocket[];

    constructor(){
        this.game =[];
        this.pendinguser = null;
        this.users =[];

    }
    addUser(socket:WebSocket){
        this.users.push(socket)
        this.addHandler(socket)
    }
    removeUser(socket:WebSocket){
        this.users.filter(user=> user !== socket);
    }

    
    private addHandler(socket:WebSocket)
 {
     socket.on("message",(data)=>{
        const message = JSON.parse(data.toString());
       
        if(message.type == INIT_GAME )
        {
            if(this.pendinguser)
            {
                const game = new Game(this.pendinguser , socket);
                this.game.push(game);
                this.pendinguser= null;
            }
            else{
                this.pendinguser = socket;
            }
            
        }
        if (message.type === MOVE) {
        const game = this.game.find( g => g.hasPlayer(socket));

            if (game) {
                 game.makeMove(socket, message.move);
                    }
        }

     })

}



}