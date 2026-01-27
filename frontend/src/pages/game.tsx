
import {Logo} from "../components/logo"
import { GameController } from "../components/chess/gamecontroller"
export function GamePage()
{
    return(
        <div>
            <div className="min-h-screen bg-yellow-100 ">
                 <div className="h-24 w-full bg-amber-50 ">
                     <div className=" flex justify-center">
                      <Logo size={"sm"} showtagline={false}/>
                     </div>
                    </div>    
             <div className="flex grid-grid-cols-2  bg-yellow-100">
            <div className="col-span-1 pt-25 ml-20 items-center">
            <GameController/>
            </div>
            </div>
        </div>
    </div>
    )
}