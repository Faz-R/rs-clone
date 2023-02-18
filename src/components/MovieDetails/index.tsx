import { useAsyncValue } from 'react-router-dom';
import parseMoviesData from '@utils/parseMovieData';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect, useState } from 'react';
import { addMovieToWillView, removeMovieFromWillView } from '@store/willViewSlice';
import { addMovieToViewed, removeMovieFromViewed } from '@store/viewedSlice';
import type { MovieDataInterface } from '@/types';
import classes from './index.module.scss';

const MovieDetails = () => {
  const movieData = useAsyncValue() as MovieDataInterface;
  const [movie] = parseMoviesData([movieData], 10);
  const dispatch = useAppDispatch();
  const viewedArr = useAppSelector((state) => state.viewed.viewed);

  const willViewArr = useAppSelector((state) => state.willview.value);

  const [viewed, setViewed] = useState(false);
  const [planWatch, setPlanWatch] = useState(false);

  const addViewed = () => {
    dispatch(addMovieToViewed(movie));
  };

  const removeViewed = () => {
    dispatch(removeMovieFromViewed(movie));
  };

  const addWillView = () => {
    dispatch(addMovieToWillView(movie));
  };

  const removeWillView = () => {
    dispatch(removeMovieFromWillView(movie));
  };

  useEffect(() => {
    if (viewedArr.some((elem) => elem.id === movie.id)) {
      setViewed(true);
    } else {
      setViewed(false);
    }

    if (willViewArr.some((elem) => elem.id === movie.id)) {
      setPlanWatch(true);
    } else {
      setPlanWatch(false);
    }
  }, [movie, movie.poster, viewedArr, willViewArr]);

  const FilmName = () => {
    if (!movie.name) {
      return `Название фильма`;
    }
    return movie.name ? movie.name : `Название фильма отсутствует`;
  };

  const FilmDescription = () => {
    if (!movie.description) {
      return `Описание фильма`;
    }
    return movie.description ? movie.description : `Описание фильма отсутствует`;
  };

  const Rating = () => {
    let ratingArray: (number | null)[] = [];

    if (movie.rating) {
      ratingArray = Object.values(movie.rating);
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

  function ratingStars(rating: number) {
    return 10 * rating;
  }

  return (
    <div className={classes.movie}>
      <div className={classes.movie__top}>
        <div className={classes.movie__wrapper}>
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.name ? movie.name : 'Постер фильма'}
              className={classes.movie__poster}
            />
          ) : (
            <div className={classes.poster__error}>
              <i className={`fa-solid fa-triangle-exclamation ${classes.poster__error__icon}`} />
              Постер отсутствует
            </div>
          )}
        </div>
        <div className={classes.movie__info}>
          <h2 className={classes.movie__title}>{FilmName()}</h2>
          <span className={`${classes.movie__title__eng}`}>
            {movie.alternativeName ? movie.alternativeName : ''}
          </span>
          <div className={classes.movie__rating}>
            <div className={classes.movie__body}>
              <div
                className={classes.movie__active}
                style={{ width: `${Rating() ? ratingStars(Rating()) : ratingStars(0)}%` }}
              />
            </div>
            <div className={classes.movie__rating__text}>{Rating() || ''}</div>
          </div>
          <span className={`${classes.movie__year} ${classes.movie__text}`}>
            <b>
              {movie.countries ? movie.countries.join(', ') : ''}{' '}
              {movie.year ? <span className={classes.movie__point}>●</span> : ''}{' '}
              {movie.year ? movie.year : ''}{' '}
              {movie.movieLength ? <span className={classes.movie__point}>●</span> : ''}{' '}
              {movie.movieLength ? `${movie.movieLength} мин.` : ''}
            </b>
          </span>
          <span className={`${classes.movie__director} ${classes.movie__text}`}>
            <b>Режиссёр:</b> {movie.director ? movie.director : '-'}
          </span>
          <span className={`${classes.movie__actors} ${classes.movie__text}`}>
            <b>Актёры:</b>{' '}
            {movie.actors && movie.actors[0] !== null ? movie.actors.join(', ') : '-'}
          </span>
          <span className={`${classes.movie__genres} ${classes.movie__text}`}>
            <b>Жанр:</b> {movie.genres ? movie.genres.join(', ') : '-'}
          </span>
          <div className={classes.movie__icons}>
            <div
              className={classes.movie__icon}
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
                className={`fa-regular fa-bookmark ${classes.movie__show__button} ${
                  !planWatch && `${classes.movie__show__button__active}`
                }`}
              />
              <i
                className={`fa-solid fa-bookmark ${classes.movie__show__button} ${
                  classes.movie__icon__active
                } ${planWatch && `${classes.movie__show__button__active}`}`}
              />
            </div>
            <div
              className={classes.movie__icon}
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
                className={`fa-regular fa-eye ${classes.movie__show__button} ${
                  !viewed && `${classes.movie__show__button__active}`
                }`}
              />
              <i
                className={`fa-solid fa-eye ${classes.movie__show__button} ${
                  classes.movie__icon__active
                } ${viewed && `${classes.movie__show__button__active}`}`}
              />
            </div>
          </div>
        </div>
      </div>

      <p className={`${classes.movie__description} ${classes.movie__text}`}>{FilmDescription()}</p>
    </div>
  );
};

export default MovieDetails;
