import { ProductOptsArr, ProductOpts } from './interfaces';
import classes from './Select.module.css';

export const Select = ({ options, defaultValue, value, onChange }: ProductOptsArr) => {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="select">
      <option disabled value="" className={classes.option}>
        {defaultValue}
      </option>
      {options.map((option: ProductOpts) => (
        <option key={option.id} value={option.value} className={classes.option}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
