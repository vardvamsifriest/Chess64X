interface input {
    type:string;
    placeholder:string; 
    id?:string;
    label:string;
}


export function InputBox(props:input)
{
    return(
    <div className="  pt-6"> 
        <label className="font-medium text-sm font-mono" htmlFor ={props.id}>{props.label} </label>
    <input type={props.type} id={props.id} placeholder={props.placeholder} className="shadow-md text-md text-shadow-xl mt-2"/>
    </div>
    )
    
}