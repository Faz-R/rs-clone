import React from 'react';
import classes from './Range.module.css'

interface rangeProps {
  min: number,
  max: number,
  step: number,
  value: number,
  onChange: (item: number) => void,
  className: string  
}

function Range({value, onChange, min, max, step, className}: rangeProps) {
  return (
    <div className={className}>        
        <input className= {classes.rangebar}
          list="tickmarks"
          value={value}          
          onChange={event => onChange(+event.target.value)}
          type="range"          
          name="price" 
          min={min} 
          max={max} 
          step={step}/>                  
    </div>
  )
}

export default Range;