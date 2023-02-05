import { useState, useEffect } from 'react';
import Range from '../../components/UI/Range/Range';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import './index.css';
import getMoviesData from '../../api/getMoviesData';
import getGenresData from '../../api/getGenresData';
import getAllGenres from './constants';
import DoubleRange from '../../components/UI/DoubleRange/DoubleRange';

const minYear = 1900;
const maxYear = 2023;
const setYear = 1;
let id = 0;

const genres = Array.from(Object.values(getAllGenres)).map((i) => {
  id = +1;
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
  const [filter, setFilter] = useState({ brand: '', checked: true });
  const [genresState, setGenresState] = useState([{ name: '', id: 0 }]);

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

  useEffect(() => {
    if (genres) {
      setGenresState(genres);
    }
  }, []);

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
      <div className="random_movie">
        <DoubleRange
          valuemin={minYearRange}
          valuemax={maxYearRange}
          min={minYear}
          max={maxYear}
          step={setYear}
          onChange={rangeMaxYear}
          onChange2={rangeMinYear}
          className="my-range max-range-slidebar"
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
