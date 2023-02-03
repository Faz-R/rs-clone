import { useState } from 'react';
import Range from '../components/UI/Range/Range';

const minYear = 1900;
const maxYear = 2023;
const setYear = 1;
const idMaxYear = 'max-year';

const RandomMovie = () => {
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);

  const rangeMinYear = (value: number) => {
    setMinYear(value);
    console.log(minYearRange);
  };

  const rangeMaxYear = (value: number) => {
    setMaxYear(value);
    console.log(maxYearRange);
  };

  return (
    <div className="random_movie">
      <div className="range-block price-block">
        <div className="range-values">
          <p className="min-range"> {minYear}</p>
          <p className="max-range">{maxYear}</p>
        </div>
        <Range
          value={minYearRange}
          min={minYear}
          max={maxYear}
          step={setYear}
          onChange={rangeMinYear}
          className="my-range min-range-slidebar"
          id="min-year"
        />
        <Range
          value={maxYearRange}
          min={minYear}
          max={maxYear}
          step={setYear}
          onChange={rangeMaxYear}
          className="my-range max-range-slidebar"
          id={idMaxYear}
        />
        <label htmlFor={idMaxYear} className="range-block-name">
          <strong>Year </strong>
        </label>
      </div>
    </div>
  );
};

export default RandomMovie;
