import { useState, useEffect } from 'react';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import './index.css';
import getMoviesData from '../../api/getMoviesData';
import getGenresData from '../../api/getGenresData';
import getAllGenres from './constants';
import DoubleRange from '../../components/UI/DoubleRange/DoubleRange';
import Button from '../../components/UI/button/Button';
import { MovieHumorInterface } from '../../types';

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

/* movies(); */
let expanded = false;
const RandomMovie = () => {
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);
  const [minRateRange, setMinRate] = useState(minRate);
  const [maxRateRange, setMaxRate] = useState(maxRate);
  const [filter, setFilter] = useState([]);
  const [genresState, setGenresState] = useState([{ name: '', id: 0 }]);
  const [cardOfMovie, setCardOfMovie] = useState(false);
  const [randomMovie, setRandomMovie] = useState('выберите другие параметры');
  useEffect(() => {
    if (genres) {
      setGenresState(genres);
      // console.log('genres', genres);
    }
  }, [cardOfMovie]);

  const getMovie = async () => {
    await getMoviesData(
      {
        genres: filter,
        year: `${minYearRange}-${maxYearRange}`,
        rating: `${minRateRange}-${maxRateRange}`,
      },
      true
    ).then((r) =>{
      setCardOfMovie(true);
      console.log(r);
      if(r) setRandomMovie(r.toString());});
  };

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

  const checkedGenres = (check: boolean, item: string) => {
    if (check) filter.push(item);
    else {
      setFilter(filter.filter((i) => i !== item));
    }
  };

  return (
    <div className="random_movie">
      <form>
        <div className="multiselect">
          <div id="overSelect" className="selectBox">
            <select>
              <option>Select an option</option>
            </select>
            <div className="overSelect" onClick={showCheckboxes} />
          </div>
          <div id="checkboxes">
            <div className="checkboxes_menu">
              {genresState.map((item) => (
                <Checkbox item={item.name} key={item.id} onChange={checkedGenres} value="genres" />
              ))}
            </div>
          </div>
        </div>
      </form>
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
      <div className="button_random_movie">
        <Button children="Случайный фильм" onClick={getMovie} />
      </div>
      <div className="card_of_movie">
        {!cardOfMovie ? '' : `${randomMovie}`}
      </div>
    </div>
  );
};

export default RandomMovie;
