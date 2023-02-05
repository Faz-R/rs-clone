import { useState, useEffect } from 'react';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import './index.css';
import getMoviesData from '../../api/getMoviesData';
import getGenresData from '../../api/getGenresData';
import getAllGenres from './constants';
import DoubleRange from '../../components/UI/DoubleRange/DoubleRange';

const minYear = 1900;
const maxYear = 2023;
const setYear = 1;
const minRate = 0;
const maxRate = 10;
const setRate = 0.1;
let id = 0;

const genres = Array.from(Object.values(getAllGenres)).map((i) => {
  id += 1;
  return { name: i, id };
});

/* const movies = async () => {
  await getMoviesData(
    {
      genres,
      year: '1900-2023',
    },
    false
  ).then((r) => {
    if (r) r.forEach((element) => console.log(element.genres));
  });
}; */

/* movies(); */
let expanded = false;
const RandomMovie = () => {
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);
  const [minRateRange, setMinRate] = useState(minRate);
  const [maxRateRange, setMaxRate] = useState(maxRate);
  const [filter, setFilter] = useState(['']);
  const [genresState, setGenresState] = useState([{ name: '', id: 0 }]);
  useEffect(() => {
    if (genres) {
      setGenresState(genres);
      // console.log('genres', genres);
    }
  }, []);

  const checkboxes = document.getElementById('checkboxes');

  const showCheckboxes = function a() {
    if (checkboxes) {
      if (!expanded) {
        checkboxes.style.display = 'block';

        expanded = true;
      } else {
        checkboxes.style.display = 'none';
        expanded = false;
      }
    }
  };

  const rangeMinYear = (value: number) => {
    setMinYear(value);
  };

  const rangeMaxYear = (value: number) => {
    setMaxYear(value);
  };

  const rangeMinRate = (value: number) => {
    setMinRate(value);
    console.log('minRateRange', minRateRange);
  };

  const rangeMaxRate = (value: number) => {
    setMaxRate(value);
    console.log('maxRateRange', maxRateRange);
  };

  const checkedBrand = (check: boolean, item: string) => {
    if (check) filter.push(item);
    else {
      setFilter(filter.filter((i) => i !== item));
      console.log('filter', filter, check);
    }
  };

  return (
    <div className="random_movie">
      <div className="select_movie_year">
        <DoubleRange
          valuemin={minYearRange}
          valuemax={maxYearRange}
          min={minYear}
          max={maxYear}
          step={setYear}
          onChange={rangeMaxYear}
          onChange2={rangeMinYear}
          className="year"
        />
      </div>
      <div className="select_movie_rating">
        <DoubleRange
          valuemin={minRateRange}
          valuemax={maxRateRange}
          min={minRate}
          max={maxRate}
          step={setRate}
          onChange={rangeMaxRate}
          onChange2={rangeMinRate}
          className="rating"
        />
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
            {genresState.map((item) => (
              <Checkbox item={item.name} key={item.id} onChange={checkedBrand} value="brand" />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RandomMovie;
