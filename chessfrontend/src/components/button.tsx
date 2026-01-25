import type { ReactElement } from "react";


 export interface buttonprops{
    size:"sm"|"md"|"lg",
    text:string,
    variant:"primary"|"secondary",
    onClick?:()=>void;
    starticon?:ReactElement
}
const variantstyles = {
    "primary":"bg-yellow-100 transition-all hover:bg-yellow-800 rounded:md outline-2 outline-yellow-800 font-mono hover:cursor-pointer",
    "secondary":"bg-amber-50 transition-all hover:bg-yellow-800 rounded:md outline-2 outline-yellow-800 font-mono hover:cursor-pointer"
}
const sizestyles={
    "sm":"p-2",
    "md":"p-4",
    "lg":"p-6"
}

export function Button(props:buttonprops)
{ return(

    
    <button onClick={props.onClick}
    className={`${variantstyles[props.variant]} ${sizestyles[props.size]} flex items-center gap-2`}>{props.starticon ? props.starticon : null}
     {props.text}</button>
    
) 
}