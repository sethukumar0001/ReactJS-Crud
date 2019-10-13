import React,{useState} from 'react';
import './progressbar.css';

export default function ProgressBar (props){
const [percentage,setPercentage] = useState(props.percentage)
console.log(percentage);
    return(

        <div className="progress-bar">
            <Filler percentage={percentage}/>
        </div>

    )
   
}
const Filler =(props)=>{
    return <div className="filler" style={{width:`${props.percentage}%`}}>

    </div>
}
