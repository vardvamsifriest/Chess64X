import {Button} from "./button"


interface card {
    showbutton:boolean,
    text:string,
    title:string
}


export function Card(props:card)
{
    return (
        <div className="bg-amber-50 h-100 w-100 grid place-content-center outline-2 shadow-md outline-yellow-800">
            <p className="font-mono text-md font-semibold">{props.title}</p>
            {props.showbutton && (
            <div className="pt-60">
            <Button size="lg" text= {props.text} variant="primary"/>
            </div>)}
        </div>
    )
}