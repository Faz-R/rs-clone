import classes from './Range.module.scss';

interface IRangeProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (item: number) => void;
  className: string;
  name: string;
}

const Range = ({ value, onChange, min, max, step, className, name }: IRangeProps) => {
  return (
    <div className={className}>
      <input
        className={classes.rangebar}
        value={value}
        onChange={(event) => onChange(+event.target.value)}
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default Range;
