import { useSharedSocket } from "../hooks/socketcontext";
import {Button} from "./button"
import { useNavigate } from "react-router-dom"



interface card {
    showbutton:boolean,
   
    title:string
}


export function Card(props:card)
{   const navigate = useNavigate();
    const socket = useSharedSocket();
    
    const joinRoom = () => {
        console.log("Join room clicked")
         navigate("/waiting");

  if (socket) {
    
    socket.send(JSON.stringify({ type: "INIT_GAME" }));
  } 
};
   
    return (
        <div className="bg-amber-50 h-100 w-100 grid place-content-center outline-2 shadow-md outline-yellow-800">
            <p className="font-mono text-md font-semibold">{props.title}</p>
            {props.showbutton && (
            <div className="pt-60">
            <Button size="lg"  variant="primary" text="JOIN ROOM" onClick={joinRoom}/>
            </div>)}
        </div>
    )
}