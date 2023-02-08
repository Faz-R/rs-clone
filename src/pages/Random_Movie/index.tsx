import { useState, useEffect } from 'react';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import './index.scss';
import getMoviesData from '../../api/getMoviesData';
import { maxRate, setRate, minRate, setYear, maxYear, minYear, genres } from './constants';
import DoubleRange from '../../components/UI/DoubleRange/DoubleRange';
import Button from '../../components/UI/button/Button';
import { MovieHumorInterface } from '../../types';
import poster from '../../assets/img/poster.svg';

const RandomMovie = () => {
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);
  const [minRateRange, setMinRate] = useState(minRate);
  const [maxRateRange, setMaxRate] = useState(maxRate);
  const [filter, setFilter] = useState([] as string[]);
  const [genresState, setGenresState] = useState([{ name: '', id: 0 }]);
  const [cardOfMovie, setCardOfMovie] = useState(false);
  const [randomMovie, setRandomMovie] = useState({} as MovieHumorInterface);
  const [showCheckboxes, setshowCheckboxes] = useState(false);
  useEffect(() => {
    if (genres) {
      setGenresState(genres);
    }

    if (showCheckboxes === true) {
      document.addEventListener('click', (e) => {
        if (
          !(e.target as HTMLElement).className.includes('switch-block__select') &&
          !(e.target as HTMLElement).closest('.switch-block__checkboxes-menu')
        ) {
          setshowCheckboxes(false);
        }
      });
    }
  }, [cardOfMovie, showCheckboxes]);

  const getMovie = async () => {
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
    <div className="random-movie">
      <div className="switch-block">
        <div className="switch-block__title">
          <i className="fa-solid fa-angles-right design__row" /> Случайный фильм
        </div>
        <div className="switch-block__multiselect">
          <div
            className={`switch-block__select ${showCheckboxes ? `border__select__active` : ''}`}
            onClick={() => {
              setshowCheckboxes(!showCheckboxes);
            }}
            aria-hidden="true">
            Жанр фильма
            <i
              className={`fa-solid fa-angle-down switch-block__select__angle ${
                !showCheckboxes ? `select__angle__active` : ''
              }`}
            />
            <i
              className={`fa-solid fa-angle-up switch-block__select__angle ${
                showCheckboxes ? `select__angle__active` : ''
              }`}
            />
          </div>
          <div
            className={`switch-block__checkboxes-menu ${showCheckboxes ? `checkboxes__show` : ''}`}>
            {genresState.map((item) => (
              <Checkbox item={item.name} key={item.id} onChange={checkedGenres} value="genres" />
            ))}
          </div>
        </div>
        <span className="switch-block__subtitle">Рейтинг фильма</span>
        <div className="random-movie__range">
          <DoubleRange
            valuemin={minRateRange}
            valuemax={maxRateRange}
            min={minRate}
            max={maxRate}
            step={setRate}
            onChange={rangeMaxRate}
            onChange2={rangeMinRate}
            className="rating"
            nameMin="year"
            nameMax="year"
          />
        </div>
        <span className="switch-block__subtitle">Год фильма</span>
        <div className="random-movie__range">
          <DoubleRange
            valuemin={minYearRange}
            valuemax={maxYearRange}
            min={minYear}
            max={maxYear}
            step={setYear}
            onChange={rangeMaxYear}
            onChange2={rangeMinYear}
            className="year"
            nameMin="year"
            nameMax="year"
          />
        </div>
        <div className="button_random_movie">
          <Button onClick={getMovie}>Случайный фильм</Button>
        </div>
      </div>
      {/* randomMovie && randomMovie.name */}
      <div className="movie-card">
        <div className="movie-card__top">
          <div className="movie-card__poster">
            <div className="movie-card__placeholder">
              <svg xmlSpace="preserve" id="OBJECTS" x="0" y="0" version="1.1" viewBox="0 0 166 166">
                <path
                  d="M81 166A83 83 0 1 1 84 0a83 83 0 0 1-3 166zm0-152a69 69 0 1 0 0 138 69 69 0 0 0 0-138z"
                  className="st0"
                />
                <path
                  d="M24 55c-9 19-8 42 2 60l45-52-47-8zm54-36c-22 1-42 14-52 33l68 12-16-45zm61 93c10-19 9-42-2-61l-45 53 47 8zm-4-63a63 63 0 0 0-54-30l23 66 31-36zM28 118c13 19 33 30 55 29L58 82l-30 36zm58 29c21-1 41-14 51-33l-68-12 17 45z"
                  className="st0"
                />
              </svg>
            </div>
          </div>
          <div className="movie-card__info">
            <h2 className="movie-card__title">Название фильма</h2>
            <h3 className="movie-card__title__eng">Film Name</h3>
            <span className="movie-card__year">Год: 2023</span>
            <span className="movie-card__duration">Продолжительность: 158 мин</span>
            <span className="movie-card__rating">Рейтинг: </span>
            <span className="movie-card__genres">Жанры: </span>
            <span className="movie-card__director">Режиссёр: </span>
            <span className="movie-card__actors">Актёры: </span>
          </div>
        </div>

        <p className="movie-card__description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi illum eius accusantium.
          Voluptatum nobis assumenda recusandae, eum repellat quam debitis consequuntur!
          Repudiandae, delectus dicta! Quisquam eius fugiat nobis laudantium laborum?
        </p>
      </div>
    </div>
  );
};

export default RandomMovie;
