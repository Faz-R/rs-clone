import { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { ProductOptsArr, ProductOpts } from './interfaces';
import classes from './Select.module.css';

const Select = ({ options, defaultValue, value, onChange }: ProductOptsArr) => {
  const [filter, setFilter] = useState({ category: '', checked: true });

  const checkedCategory = (check: boolean, item: string) => {
    setFilter({ category: item, checked: check });
    console.log('filter', filter);
  };
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="select">
      <option disabled value="" className={classes.option}>
        {defaultValue}
      </option>
      {options.map((option: ProductOpts) => (
        <option key={option.id} value={option.value} className={classes.option}>
          {option.name}
          <label>
            <input type="checkbox" checked />
          </label>
        </option>
      ))}
    </select>
  );
};

export default Select;
{
  /* <option key={option.id} value={option.value} className={classes.option}>
          {option.name}
        </option> */
}
