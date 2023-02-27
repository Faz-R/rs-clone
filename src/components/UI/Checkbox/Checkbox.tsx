import classes from './Checkbox.module.scss';

interface CheckBoxProps {
  item: string;
  onChange: (checked: boolean, item: string) => void;
  value: string;
}

const Checkbox = ({ item, onChange, value }: CheckBoxProps) => {
  return (
    <div className={classes.checkbox__block}>
      <input
        type="checkbox"
        id={item}
        value={value}
        name={item}
        className={classes.checkbox}
        onChange={(event) => onChange(event.target.checked, item)}
      />
      <label htmlFor={item} className={classes.checkbox__label}>
        {item}
      </label>
    </div>
  );
};

export default Checkbox;
