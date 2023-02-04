import { useState } from 'react';
import Range from '../../components/UI/Range/Range';
import Select from '../../components/UI/select/Select';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import { options } from './constants';
import './index.css';

const minYear = 1900;
const maxYear = 2023;
const setYear = 1;

const options1 = [
  { value: 'titleup', name: 'by title asc', id: 1 },
  { value: 'titledown', name: 'by title desc', id: 2 },
  { value: 'priceup', name: 'by price asc', id: 3 },
  { value: 'pricedown', name: 'by price desc', id: 4 },
  { value: 'discountPercentageup', name: 'by discountPercentage asc', id: 5 },
  { value: 'discountPercentagedown', name: 'by discountPercentage desc', id: 6 },
];

let expanded = false;
const checkboxes = document.getElementById('checkboxes');

const showCheckboxes = function a() {
  if (checkboxes) {
    if (!expanded) {
      checkboxes.style.display = 'block';
      console.log('hui');
      expanded = true;
    } else {
      console.log('pisda');
      checkboxes.style.display = 'none';
      expanded = false;
    }
  }
};

const RandomMovie = () => {
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);
  const [selectSort, setSelectSort] = useState('sdgdgdfg');
  const [filter, setFilter] = useState({ brand: '', checked: true });

  const rangeMinYear = (value: number) => {
    setMinYear(value);
  };

  const rangeMaxYear = (value: number) => {
    setMaxYear(value);
  };

  const checkedBrand = (check: boolean, item: string) => {
    setFilter({ brand: item, checked: check });
    console.log('filter', filter);
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
        />
        <Range
          value={maxYearRange}
          min={minYear}
          max={maxYear}
          step={setYear}
          onChange={rangeMaxYear}
          className="my-range max-range-slidebar"
        />
        <div>
          {' '}
          <strong>Year</strong>
        </div>
      </div>
      <form>
        <div className="multiselect">
          <div id="overSelect" className="selectBox">
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect" onClick={showCheckboxes} />
          </div>
          <div id="checkboxes">
            <Checkbox item="hui" onChange={console.log('hui')} value="'huechec'" />
            {options1.map((item, index: number) => (
              <Checkbox
                item={item.name}
                key={item.id}
                onChange={checkedBrand}
                value={'brand' /* sArr[index] */}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RandomMovie;
