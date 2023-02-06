import './index.css';

interface CheckBoxProps {
  item: string;
  onChange: (checked: boolean, item: string) => void;
  value: string;
}

const Checkbox = ({ item, onChange, value }: CheckBoxProps) => {
  return (
    <div className="my-checkbox">
      <input
        type="checkbox"
        id={item}
        value={value}
        name={item}
        onChange={(event) => onChange(event.target.checked, item)}
      />
      <label className="items-on-stock" htmlFor={item}>
        {item}
      </label>
      {/* <span >{`${itemOnStock} /   ${itemOnStockFind}`}</span> */}
    </div>
  );
};

export default Checkbox;
