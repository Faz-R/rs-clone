import classes from './CheckboxSwitch.module.scss';

interface CheckBoxProps {
  item: string;
  value: string;
  onChange: (checked: boolean, item: string) => void;
}

const CheckboxSwitch = ({ item, value, onChange }: CheckBoxProps) => {
  return (
    <input
      type="checkbox"
      className={`checkbox__switcher ${item} ${classes.checkbox}`}
      id={item}
      value={value}
      name={item}
      onChange={(event) => onChange(event.target.checked, item)}
    />
  );
};

export default CheckboxSwitch;
