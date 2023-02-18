import CheckboxSwitch from '@components/UI/checkboxSwitch/CheckboxSwitch';
import Loader from '@components/UI/loader/Loader';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addMovieToViewed, removeMovieFromViewed } from '@store/viewedSlice';
import { addMovieToWillView, removeMovieFromWillView } from '@store/willViewSlice';
import { useEffect, useState } from 'react';
import getAnyMovie from '@api/getAnyMovie';
import Button from '@components/UI/button/Button';
import type { AnyMovieInterface } from '@/types';
import './index.scss';

const Humor = () => {
  const emotions = {
    '😀': ['комедия', 'приключения'],
    '😎': ['военный', 'боевик', 'криминал'],
    '🤩': ['мюзикл', 'музыкальный', 'музыка'],
    '👽': ['фантастика', 'фэнтези', 'игра'],
    '😊': ['детский', 'мультфильм', 'семейный'],
    '🧐': ['история', 'спорт', 'документальный', 'биография'],
    '🤠': ['вестерн', 'детектив', 'фильм-нуар'],
    '🥹': ['драма', 'мелодрама'],
    '😱': ['ужасы', 'триллер'],
    '😻': ['аниме'],
  };

  const today = new Date();
  const maxYear = today.getFullYear();
  const minYear = 1920;
  const maxRate = '7-10';
  const minRate = '1-10';

  const [ratingValue, setRatingValue] = useState(minRate);
  const [hideViewed, setHideViewed] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(false);

  const [randomMovie, setRandomMovie] = useState({} as AnyMovieInterface);

  const dispatch = useAppDispatch();
  const viewedArr = useAppSelector((state) => state.viewed.viewed);
  const exceptions = viewedArr.map((elem) => elem.id);

  const willViewArr = useAppSelector((state) => state.willview.value);

  const [viewed, setViewed] = useState(false);
  const [planWatch, setPlanWatch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showMovie, setShowMovie] = useState(false);

  const getMovie: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setShowMovie(false);
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const rating = formData.get('rating') as string;
    const showViewed = JSON.parse(formData.get('show') as string);
    const genres = (formData.get('emoji') as string).split(',');
    const year = `${minYear}-${maxYear}`;


    await getAnyMovie(
      {
        genres,
        year,
        rating,
        exceptions: showViewed ? exceptions : undefined,
      },
      0
    ).then((response) => {
      if (response) {
        setRandomMovie(response as AnyMovieInterface);
      } else if (!response) {
        setRandomMovie({} as AnyMovieInterface);
        setShowMovie(true);
        setLoading(false);
      }
    });
  };

  const [emoji, setEmoji] = useState('');

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

    if (randomMovie && randomMovie.poster === null) {
      setShowMovie(true);
      setLoading(false);
    }
  }, [randomMovie, randomMovie.poster, viewedArr, willViewArr]);

  const PosterLoad = () => {
    if (showMovie) {
      return 'active-wrapper';
    }
    return '';
  };

  function ratingStars(rating: number) {
    return 10 * rating;
  }

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
    <section className="humor">
      <h3 className="humor__title">
        <i className="fa-solid fa-angles-right design__row" /> Фильм под настроение
      </h3>
      <div className="humor__blocks">
        <form className="humor__form" onSubmit={getMovie}>
          <div className="emoji__subtitle">
            <span className="emoji__subtitle__title">Выберите эмоцию</span>
            {error && <span className="emoji__subtitle__error">Эмоция не выбрана</span>}
          </div>
          <div className="emotions__list">
            {Object.entries(emotions).map(([key, value]) => {
              return (
                <label
                  htmlFor={`${key}`}
                  className={`emotions__emoji ${emoji === `${key}` ? 'emoji__active' : ''}`}
                  key={key}>
                  {key}
                  <input
                    type="radio"
                    name="emoji"
                    id={`${key}`}
                    className="emoji__radio bubbly-button"
                    value={value}
                    checked={emoji === `${key}`}
                    onChange={() => {
                      setFormValid(true);
                      setEmoji(key);
                      setError(false);
                    }}
                    required
                  />
                </label>
              );
            })}
          </div>
          <div className="humor__row">
            <span className="humor__subtitle subtitle__row"> Высокий рейтинг</span>

            <CheckboxSwitch
              item="rating"
              value={ratingValue}
              onChange={(checked: boolean) => {
                if (checked) {
                  setRatingValue(maxRate);
                } else {
                  setRatingValue(minRate);
                }
              }}
            />
            <input type="hidden" value={minRate} name="rating" />
          </div>
          <div className="humor__row">
            <span className="humor__subtitle subtitle__row">Скрыть просмотренные</span>
            <CheckboxSwitch
              item="show"
              value={String(hideViewed)}
              onChange={() => {
                setHideViewed(!hideViewed);
              }}
            />
            <input type="hidden" value="false" name="show" />
          </div>
          <div className="button_random_movie">
            <Button
              onClick={() => {
                if (!formValid) {
                  setError(true);
                } else {
                  setError(false);
                }
              }}>
              Найти фильм
            </Button>
          </div>
        </form>
        <div className="movie-card__humor">
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
            <div className="movie-card__humor__info">
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
    </section>
  );
};

export default Humor;
