import {Chess} from "chess.js"
import {useState} from "react"
import {useRef} from "react"
import { Chessboard } from "./chessboard";

export function GameController(){


const chessRef = useRef(new Chess());
const [current , setcurrent] = useState(chessRef.current.fen())
return(
        <Chessboard board = {chessRef.current.board()}
        onMove={MakeMove}/>
    )



   function MakeMove(from:string,to:string){
    const move = chessRef.current.move({from:from,to:to})
    
    if(move)
    {
        setcurrent(chessRef.current.fen());

    }
    return(
        <Chessboard board = {chessRef.current.board()}
        onMove={MakeMove}/>
    )

}
}