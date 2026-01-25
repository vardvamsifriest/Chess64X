import {Logo} from "../components/logo"
import { InputBox } from "../components/inputbox"
import {Button} from "../components/button"
import {Link} from "react-router-dom"
export function Signup()
{
    return(
        
        <div className="h-screen bg-yellow-100 p-7  justify-items-center">
           <Logo size={"lg"} showtagline/>
              <img src = {"/strategy.png"}
        className="h-30 w-30"/>
        
        <div className="w-72 h-72 bg-amber-50 translate-y-15  items-center shadow-md pl-4 outline-2 outline-yellow-800 rounded-md">
            
            <InputBox placeholder={"Email"} type={"text"} label={"Enter your Email :"} />
            <InputBox placeholder={"Password"} type={"text"} label={"Create Your Password :"} />
            
            <div className="mt-8 mb-2 flex justify-center">
            <Button size={"sm"} variant={"primary"} text={"Sign Up"}/>
            </div>
            <Link className="flex justify-center font-mono" to="/signin">Already have an account?</Link>
        </div>
        </div>
    )
}