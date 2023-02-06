/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-children-prop */
import { useState, useEffect } from 'react';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import './index.css';
import getMoviesData from '../../api/getMoviesData';
import { maxRate, setRate, minRate, setYear, maxYear, minYear, genres } from './constants';
import DoubleRange from '../../components/UI/DoubleRange/DoubleRange';
import Button from '../../components/UI/button/Button';
import { MovieHumorInterface } from '../../types';

let expanded = false;

const RandomMovie = () => {
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);
  const [minRateRange, setMinRate] = useState(minRate);
  const [maxRateRange, setMaxRate] = useState(maxRate);
  const [filter, setFilter] = useState([] as string[]);
  const [genresState, setGenresState] = useState([{ name: '', id: 0 }]);
  const [cardOfMovie, setCardOfMovie] = useState(false);
  const [randomMovie, setRandomMovie] = useState({} as MovieHumorInterface);
  useEffect(() => {
    if (genres) {
      setGenresState(genres);
    }
  }, [cardOfMovie]);

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

  const getMovie = async () => {
    expanded = true;
    const responce = await getMoviesData(
      {
        genres: filter,
        year: `${minYearRange}-${maxYearRange}`,
        rating: `${minRateRange}-${maxRateRange}`,
      },
      true
    );
    console.log(responce);
    setRandomMovie(responce as MovieHumorInterface);

    // .then((r) => {
    //   showCheckboxes();
    //   setCardOfMovie(true);
    //   if (!Array.isArray(r) && r) {
    //     if (r.name) setRandomMovie(r.name);
    //     else getMovie();
    //   }
    // });
  };

  const rangeMinYear = (value: number) => {
    setMinYear(value);
  };

  const rangeMaxYear = (value: number) => {
    setMaxYear(value);
  };

  const rangeMinRate = (value: number) => {
    setMinRate(value);
  };

  const rangeMaxRate = (value: number) => {
    setMaxRate(value);
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
      <div className="card_of_movie">{randomMovie && randomMovie.name}</div>
    </div>
  );
};

export default RandomMovie;
