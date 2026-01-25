import {CrossIcon} from "../icons/crossicon"
import {Button} from "../components/button"
import { useNavigate } from "react-router-dom";

interface userprop {
    onClose:()=>void;
}
export function UserProfile(props:userprop)
{

    const navigate = useNavigate()
    return (
        <div>
            <div className="w-72 h-72 bg-amber-50 shadow-md outline-2 outline-yellow-800 rounded-md ">
            <div className="p-2 flex justify-end ">
            <CrossIcon onClick = {props.onClose}/>
            </div>
          
            <div className="flex  mt-45 justify-center items-center">
            <Button size={"sm"} text={"LOG OUT"} variant={"primary"} onClick={()=>navigate("/signin")} />
            </div>
            </div>
         </div>        
)
        

}