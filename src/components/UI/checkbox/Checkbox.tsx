import React from 'react';
import { products } from '../../../data';
import { IProduct } from '../../../interfaсes';
import './index.css';

interface checkBoxProps {
  id: string,
  item: string,
  value: string,
  onChange: (e: boolean, i:string) =>void
  sortedArray: IProduct[]
  checked: boolean
}

function Checkbox({id, item, value, onChange, sortedArray, checked}: checkBoxProps) {  
   const itemOnStock = products.filter((i) => i[value] === item).length;
   const itemOnStockFind = sortedArray.filter((i) => i[value] === item).length;
  return (
    <div className='checkbox-block' key={'div' + id}>
      <input key={'input' + id} type="checkbox" className='checkbox__button' id={item} name={item} onChange={event => onChange(event.target.checked, item)}  checked = {checked} />      
      <label key={'label' + id} htmlFor={item} className='checkbox__label'>{item}</label>
      <span  key={'span' + id} className="items-on-stock">{itemOnStock + ' / '+ itemOnStockFind}</span>
    </div>
  )
}

export default Checkbox;