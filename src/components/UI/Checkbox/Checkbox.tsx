import './index.css';
import { ProductOpts } from '../select/interfaces';

interface checkBoxProps {
  item: string;
  onChange: any;
  value: string;
}

const Checkbox = ({ item, onChange, value }: checkBoxProps) => {
  return (
    <div className="my-checkbox">
      <input
        type="checkbox"
        id={item}
        value={value}
        name={item}
        onChange={(event) => onChange(event.target.checked, item)}
      />
      <label htmlFor={item}>{item}</label>
      {/* <span className="items-on-stock">{`${itemOnStock} /   ${itemOnStockFind}`}</span> */}
    </div>
  );
};

export default Checkbox;
