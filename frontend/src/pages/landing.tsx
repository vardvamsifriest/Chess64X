import {Logo} from "../components/logo"
import {Button} from "../components/button"
import {PlayIcon} from "../icons/playicon"
import { useNavigate } from "react-router-dom"

export function Landing()
{
    const navigate = useNavigate();
    return(
       <div className="bg-yellow-100 min-h-screen w-screen grid grid-cols-2 ">
         <div className="ml-50 pt-40">
            <img src={"/chess.png"}
            className="h-100 w-100"/>
         </div>
         <div className=" pt-50 ">
               <p className="text-4xl  font-mono">
               Welcome To
               </p>
                <div> 
                <Logo size={"lg"} showtagline/>
                </div> 
                <div className="grid place-content-center">
                <Button onClick={()=>navigate("/signup")} starticon ={<PlayIcon/>} size={"lg"} text={"PLAY NOW"} variant={"secondary"}/>
                
                </div>
                </div>
            
                
         
        
        </div> 
    )
    
}