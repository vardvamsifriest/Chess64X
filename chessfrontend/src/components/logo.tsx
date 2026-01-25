import {CrownIcon} from "../icons/crownicon"

interface logotype{
    size:"sm"|"lg"|"md"
    showtagline:boolean;
}
const sizeStyles = {
  "sm":"scale-45",
  "md":"scale-75",
  "lg":"scale-100"
}

export function Logo(props:logotype) {
  return (
   <div className= {`inline-block ${sizeStyles[props.size]} `} >
    <div className="flex gap-4">   
      
      <div className="text-8xl font-mono font-semibold">
        Chess64
      </div>

      <div className="text-8xl font-mono -translate-16">
        <div className="translate-8">
          <CrownIcon />
        </div>
        <div className="pl-12">
        X
        </div>
      </div>
      <div>
      </div>
      </div>
      {props.showtagline && (
       <p className="font-semibold text-2xl font-mono -translate-y-16 translate-x-20"> Master the board-One move at a time.</p>
      )}
      
     </div>      
    
  );
}
