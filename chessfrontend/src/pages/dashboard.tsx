import {Logo} from "../components/logo"
import {PlayerIcon} from "../icons/playericon"
import {useState} from "react"
import { UserProfile  } from "../components/userprofile"
import {Card} from "../components/card"

export function Dashboard() {
  const [ShowProfile, setShowProfile] = useState(false);
  const [blur,setBlur] = useState(false);
  function clickhandler()
  {
    setShowProfile(true);
    setBlur(true);
  }
  function crosshandler()
  {
    setShowProfile(false);
    setBlur(false);
  }

  
    return (
    <div className="min-h-screen bg-yellow-100 relative ">  
    <div className= {blur ? "blur-sm":""}>
      <div className="h-24 w-full bg-amber-50 relative flex items-center">
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-10">
          <Logo size={"sm"} showtagline={false} />
        </div>

        <div className="ml-auto pr-6">
          <PlayerIcon onClick={clickhandler} />
        </div>
    </div>

      
      <div className="flex items-center gap-16 mt-20 ">
        <img src="./player.png" className="h-70 w-70 " />
        <div className="translate-x-30">
        <Card showbutton text="JOIN ROOM" title="Welcome to Dashboard" />   
        </div> 
        </div>
        </div>
      
      {ShowProfile && (
        <div className="fixed top-24 right-6 z-50">
          <UserProfile onClose={crosshandler} />
        </div>
      )}
    
    </div>
  );
}
