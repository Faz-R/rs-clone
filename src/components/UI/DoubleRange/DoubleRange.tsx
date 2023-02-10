import { useRef, useState } from 'react';
import classes from './DoubleRange.module.scss';

interface IDoubleRangeProps {
  min: number;
  max: number;
  step: number;
  valuemin: number;
  valuemax: number;
  onChange: (item: number) => void;
  onChange2: (item: number) => void;
  className: string;
  nameMin: string;
  nameMax: string;
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
  nameMin = 'year',
  nameMax = 'year',
}: IDoubleRangeProps) => {
  const [showInfoLeft, setShowInfoLeft] = useState('');
  const [showInfoRight, setShowInfoRight] = useState('');

  const positionMin = (valuemin - min) / (max - min);
  const positionMax = (valuemax - min) / (max - min);

  const ref = useRef(null);
  let width = 0;

  if (ref.current) {
    width = (ref.current! as HTMLElement).offsetWidth;
  }

  return (
    <div className={`range-block ${className}-block ${classes.range}`}>
      <div className={classes.range__values} ref={ref}>
        <span
          className={`${classes.values} ${classes.range__first} ${showInfoLeft}`}
          style={{ left: `${positionMin * (width - 20) - 10}px` }}>
          {valuemin}
        </span>
        <span
          className={`${classes.values} ${classes.range__second} ${showInfoRight}`}
          style={{ left: `${positionMax * (width - 19) - 10}px` }}>
          {valuemax}
        </span>
      </div>
      <div className={classes.range__lines}>
        <div className={classes.ranger__track} />
        <input
          className={`${classes.rangebar} ${classes.rangebar__first}`}
          value={valuemin}
          onChange={(event) => {
            setShowInfoLeft(`${classes.show}`);
            onChange2(+event.target.value);
            if (+event.target.value === min || +event.target.value === max) {
              setShowInfoLeft('');
            }
          }}
          type="range"
          name={nameMin}
          min={min}
          max={max}
          step={step}
        />
        <input
          className={`${classes.rangebar} ${classes.rangebar__second}`}
          value={valuemax}
          onChange={(event) => {
            setShowInfoRight(`${classes.show}`);
            onChange(+event.target.value);
            if (+event.target.value === min || +event.target.value === max) {
              setShowInfoRight('');
            }
          }}
          type="range"
          name={nameMax}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};

export default DoubleRange;
