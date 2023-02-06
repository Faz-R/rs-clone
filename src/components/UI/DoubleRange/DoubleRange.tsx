/* import './Range.module.css'; */
import classes from './DoubleRange.module.scss';

interface IRangeProps {
  min: number;
  max: number;
  step: number;
  valuemin: number;
  valuemax: number;
  onChange: (item: number) => void;
  onChange2: (item: number) => void;
  className: string;
}

const DoubleRange = ({
  valuemin,
  valuemax,
  onChange,
  onChange2,
  min,
  max,
  step,
  className,
}: IRangeProps) => {
  return (
    <div className={`range-block ${className}-block`}>
      <div className="range-values">
        <p className="min-range">{valuemin}</p>
        <p className="max-range">{valuemax}</p>
      </div>
      <input
        className={classes.rangebar}
        value={valuemin}
        onChange={(event) => onChange2(+event.target.value)}
        type="range"
        name="year"
        min={min}
        max={max}
        step={step}
      />
      <input
        className={classes.rangebar}
        value={valuemax}
        onChange={(event) => onChange(+event.target.value)}
        type="range"
        name="year"
        min={min}
        max={max}
        step={step}
      />
      <div className="title_range">
        {' '}
        <strong>{className}</strong>
      </div>
    </div>
  );
};

export default DoubleRange;
