import { useState, useEffect } from 'react';
import Checkbox from '@components/UI/Checkbox/Checkbox';
import './index.scss';
import getMoviesData from '@api/getMoviesData';
import DoubleRange from '@components/UI/DoubleRange/DoubleRange';
import Button from '@components/UI/button/Button';
import { maxRate, setRate, minRate, setYear, maxYear, minYear, genres } from './constants';
import type { MovieRandomInterface } from '@/types';

const RandomMovie = () => {
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);
  const [minRateRange, setMinRate] = useState(minRate);
  const [maxRateRange, setMaxRate] = useState(maxRate);
  const [filter, setFilter] = useState([] as string[]);
  const [genresState, setGenresState] = useState([{ name: '', id: 0 }]);
  const [cardOfMovie, setCardOfMovie] = useState(false);
  const [randomMovie, setRandomMovie] = useState({} as MovieRandomInterface);
  const [showCheckboxes, setshowCheckboxes] = useState(false);

  // TODO: поправить работу кнопок карточки фильма с учётом Redux

  const [viewed, setViewed] = useState(false);
  const [planWatch, setPlanWatch] = useState(false);

  const [loading, setLoading] = useState(false);
  // const [imgLoad, setImgLoad] = useState(false);
  const [showMovie, setShowMovie] = useState(false);

  useEffect(() => {
    if (genres) {
      setGenresState(genres);
    }

    if (randomMovie && randomMovie.poster === null) {
      setShowMovie(true);
      setLoading(false);
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
  }, [cardOfMovie, showCheckboxes, randomMovie, randomMovie.poster]);

  const PosterLoad = () => {
    if (showMovie) {
      return 'active-wrapper';
    }
    return '';
  };

  const getMovie = async () => {
    setShowMovie(false);
    setLoading(true);
    await getMoviesData(
      {
        genres: filter,
        year: `${minYearRange}-${maxYearRange}`,
        rating: `${minRateRange}-${maxRateRange}`,
      },
      true
    ).then((response) => {
      if (response) {
        setRandomMovie(response as MovieRandomInterface);
      } else if (!response) {
        setRandomMovie({} as MovieRandomInterface);
        setShowMovie(true);
        setLoading(false);
      }
    });
  };

  function ratingStars(rating: number) {
    return 10 * rating;
  }

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

  const FilmName = () => {
    if (!randomMovie.name) {
      return `Название фильма`;
    }
    return randomMovie.name ? randomMovie.name : `Название фильма отсутствует`;
  };

  const FilmDescription = () => {
    if (!randomMovie.description) {
      return `Описание фильма`;
    }
    return randomMovie.description ? randomMovie.description : `Описание фильма отсутствует`;
  };

  const Rating = () => {
    let ratingArray: number[] = [];

    if (randomMovie.rating) {
      ratingArray = Object.values(randomMovie.rating);
      return Number((ratingArray.reduce((sum, e) => sum + e, 0) / ratingArray.length).toFixed(1));
    }

    return 0;
  };

  return (
    <div className="random-movie">
      <div className="random-movie__title">
        <i className="fa-solid fa-angles-right design__row" /> Случайный фильм
      </div>
      <div className="random-movie__blocks">
        <div className="switch-block">
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
              className={`switch-block__checkboxes-menu ${
                showCheckboxes ? `checkboxes__show` : ''
              }`}>
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
        <div className="movie-card">
          <div className="movie-card__top">
            <div className={`movie-card__wrapper ${PosterLoad()}`}>
              <div className="movie-card__picture">
                <div className="movie-card__front">
                  <div className="movie-card__placeholder">
                    <svg
                      xmlSpace="preserve"
                      id="OBJECTS"
                      x="0"
                      y="0"
                      version="1.1"
                      viewBox="0 0 284 284"
                      className="movie-card__placeholder-icon">
                      <path
                        d="m244 78-69 69V27c29 8 53 26 69 51zm3 6-85 85h97a123 123 0 0 0-12-85zm-42 160c25-15 44-40 53-69H137l68 69zM25 116a123 123 0 0 0 12 85l85-85H25zm53-76c-24 16-43 40-51 69h120L78 40zm38 219a123 123 0 0 0 83-11l-84-86v97zm-7-1V138l-68 68c15 25 40 44 68 52zm60-233a123 123 0 0 0-85 12l85 85V25z"
                        className={loading ? 'animation__active' : ''}
                      />
                      <path d="M273 87a144 144 0 0 0-76-76A141 141 0 0 0 11 87a141 141 0 0 0 76 186 141 141 0 0 0 186-76 141 141 0 0 0 0-110zM142 271a129 129 0 1 1 0-258 129 129 0 0 1 0 258z" />
                    </svg>
                  </div>
                </div>
                <div className="movie-card__back">
                  {randomMovie && Object.values(randomMovie).length !== 0 ? (
                    <div className="movie-card__back__wrapper">
                      <div className="movie-card__icons">
                        <div
                          className="movie-card__icon"
                          onClick={() => {
                            setPlanWatch(!planWatch);
                          }}
                          aria-hidden="true">
                          <i
                            className={`fa-regular fa-bookmark movie-card__show-button ${
                              !planWatch && `movie-card__show-button__active`
                            }`}
                          />
                          <i
                            className={`fa-solid fa-bookmark movie-card__show-button movie-card__icon__active ${
                              planWatch && `movie-card__show-button__active`
                            }`}
                          />
                        </div>
                        <div
                          className="movie-card__icon"
                          onClick={() => {
                            setViewed(!viewed);
                          }}
                          aria-hidden="true">
                          <i
                            className={`fa-regular fa-eye movie-card__show-button ${
                              !viewed && `movie-card__show-button__active`
                            }`}
                          />
                          <i
                            className={`fa-solid fa-eye movie-card__show-button movie-card__icon__active ${
                              viewed && `movie-card__show-button__active`
                            }`}
                          />
                        </div>
                      </div>
                      {randomMovie.poster ? (
                        <img
                          src={randomMovie.poster}
                          alt={randomMovie.name ? randomMovie.name : 'Постер фильма'}
                          className="movie-card__poster"
                          onLoad={() => {
                            setLoading(false);
                            setShowMovie(true);
                          }}
                        />
                      ) : (
                        <div className="poster-error">
                          <i className="fa-solid fa-triangle-exclamation poster-error__icon" />
                          Постер отсутствует
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="movie-card__back__wrapper">
                      <i className="fa-solid fa-video-slash poster-error__icon" />
                      <div className="poster-error">Подходящий фильм не найден</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="movie-card__info">
              <h2 className="movie-card__title">{FilmName()}</h2>
              <span className="movie-card__title__eng movie-card__text">
                {randomMovie.alternativeName ? randomMovie.alternativeName : ''}
              </span>
              <div className="movie-card__rating">
                <div className="movie-card__body">
                  <div
                    className="movie-card__active"
                    style={{ width: `${Rating() ? ratingStars(Rating()) : ratingStars(0)}%` }}
                  />
                </div>
                <div className="movie-card__rating-text">{Rating() || ''}</div>
              </div>
              <span className="movie-card__year movie-card__text">
                {randomMovie.countries ? randomMovie.countries.join(', ') : 'Страна'}{' '}
                <span className="movie-card__point">●</span>{' '}
                {randomMovie.year ? randomMovie.year : 'Год'}{' '}
                <span className="movie-card__point">●</span>{' '}
                {randomMovie.movieLength ? `${randomMovie.movieLength} мин.` : 'Время'}
              </span>
              <span className="movie-card__director movie-card__text">
                Режиссёр: {randomMovie.director ? randomMovie.director : '-'}
              </span>
              <span className="movie-card__actors movie-card__text">
                Актёры:{' '}
                {randomMovie.actors && randomMovie.actors[0] !== null
                  ? randomMovie.actors.join(', ')
                  : '-'}
              </span>
              <span className="movie-card__genres movie-card__text">
                Жанр: {randomMovie.genres ? randomMovie.genres.join(', ') : '-'}
              </span>
            </div>
          </div>

          <p className="movie-card__description movie-card__text">{FilmDescription()}</p>
        </div>
      </div>
    </div>
  );
};

export default RandomMovie;
