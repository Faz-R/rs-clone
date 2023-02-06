import './index.css';

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
      <label className="items-on-stock" htmlFor={item}>
        {item}
      </label>
      {/* <span >{`${itemOnStock} /   ${itemOnStockFind}`}</span> */}
    </div>
  );
};

export default Checkbox;
