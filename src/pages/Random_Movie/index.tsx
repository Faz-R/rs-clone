import { useState, useEffect } from 'react';
import Checkbox from '@components/UI/Checkbox/Checkbox';
import getMoviesData from '@api/getAnyMovie';
import DoubleRange from '@components/UI/DoubleRange/DoubleRange';
import Button from '@components/UI/button/Button';
import CheckboxSwitch from '@components/UI/checkboxSwitch/CheckboxSwitch';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addMovieToViewed, removeMovieFromViewed } from '@store/viewedSlice';
import { addMovieToWillView, removeMovieFromWillView } from '@store/willViewSlice';
import Loader from '@components/UI/loader/Loader';
import { maxRate, setRate, minRate, setYear, maxYear, minYear, genres } from './constants';
import type { AnyMovieInterface } from '@/types';
import './index.scss';

const RandomMovie = () => {
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);
  const [minRateRange, setMinRate] = useState(minRate);
  const [maxRateRange, setMaxRate] = useState(maxRate);
  const [filter, setFilter] = useState([] as string[]);
  const [genresState, setGenresState] = useState([{ name: '', id: 0 }]);
  const [cardOfMovie, setCardOfMovie] = useState(false);
  const [randomMovie, setRandomMovie] = useState({} as AnyMovieInterface);
  const [showCheckboxes, setshowCheckboxes] = useState(false);
  const [addExceptions, setAddExceptions] = useState(false);

  const dispatch = useAppDispatch();
  const viewedArr = useAppSelector((state) => state.viewed.viewed);
  const exceptions = viewedArr.map((elem) => elem.id);
  const willViewArr = useAppSelector((state) => state.willview.value);

  const [viewed, setViewed] = useState(false);
  const [planWatch, setPlanWatch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showMovie, setShowMovie] = useState(false);

  const addViewed = () => {
    dispatch(addMovieToViewed(randomMovie));
  };

  const removeViewed = () => {
    dispatch(removeMovieFromViewed(randomMovie));
  };

  const addWillView = () => {
    dispatch(addMovieToWillView(randomMovie));
  };

  const removeWillView = () => {
    dispatch(removeMovieFromWillView(randomMovie));
  };

  useEffect(() => {
    if (viewedArr.some((elem) => elem.id === randomMovie.id)) {
      setViewed(true);
    } else {
      setViewed(false);
    }

    if (willViewArr.some((elem) => elem.id === randomMovie.id)) {
      setPlanWatch(true);
    } else {
      setPlanWatch(false);
    }

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
  }, [cardOfMovie, showCheckboxes, randomMovie, randomMovie.poster, viewedArr, willViewArr]);

  const PosterLoad = () => {
    if (showMovie) {
      return 'active-wrapper';
    }
    return '';
  };

  const getMovie = async () => {
    setShowMovie(false);
    setLoading(true);
    await getMoviesData({
      genres: filter,
      year: `${minYearRange}-${maxYearRange}`,
      rating: `${minRateRange}-${maxRateRange}`,
      exceptions: addExceptions ? exceptions : undefined,
    }).then((response) => {
      if (response) {
        setRandomMovie(response as AnyMovieInterface);
      } else if (!response) {
        setRandomMovie({} as AnyMovieInterface);
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
    let ratingArray: (number | null)[] = [];

    if (randomMovie.rating) {
      ratingArray = Object.values(randomMovie.rating);
      if (ratingArray === null) return 0;

      return Number(
        (
          (ratingArray as number[]).reduce((sum, e) => {
            if (e === null) return sum;
            return sum + e;
          }, 0) / ratingArray.length
        ).toFixed(1)
      );
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
          <div className="switch-block__top">
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
                  <Checkbox
                    item={item.name}
                    key={item.id}
                    onChange={checkedGenres}
                    value="genres"
                  />
                ))}
              </div>
            </div>
            <div className="switch-block__viewed">
              <span className="switch-block__subtitle subtitle__viewed">Скрыть просмотренные</span>
              <CheckboxSwitch
                item="viewed__switcher"
                onChange={(checked: boolean) => {
                  setAddExceptions(!addExceptions);
                }}
                value=""
              />
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
                    <Loader loading={loading} className="movie-card__placeholder-icon" />
                  </div>
                </div>
                <div className="movie-card__back">
                  {randomMovie && Object.values(randomMovie).length !== 0 ? (
                    <div className="movie-card__back__wrapper">
                      <div className="movie-card__icons">
                        <div
                          className="movie-card__icon"
                          onClick={() => {
                            if (planWatch) {
                              removeWillView();
                              setPlanWatch(false);
                            } else {
                              addWillView();
                              setPlanWatch(true);
                            }
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
                            if (viewed) {
                              removeViewed();
                              setViewed(false);
                            } else {
                              addViewed();
                              setViewed(true);
                            }
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
