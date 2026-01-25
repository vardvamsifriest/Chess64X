import {useState} from "react"
import {useEffect} from "react"

const WS_URL = "ws://localhost:8080/ws";

export function useSocket ()
{
    const [socket,setSocket] = useState<WebSocket | null>(null)

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);
        ws.onopen = ()=>{
           
            setSocket(null);
        }
        ws.onclose = ()=>{
            
            setSocket(null);
        }
            return()=>{
                ws.close();
            }
    },[])
    return socket;
}