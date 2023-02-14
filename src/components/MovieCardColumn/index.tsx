import { useEffect, useState } from 'react';
import { addMovieToViewed, removeMovieFromViewed } from '@store/viewedSlice';
import { addMovieToWillView, removeMovieFromWillView } from '@store/willViewSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Link } from 'react-router-dom';
import { AnyMovieInterface } from '../../types';
import classes from './index.module.scss';

interface IMovieCardColumn {
  movie: AnyMovieInterface;
}

const MovieCardColumn = ({ movie }: IMovieCardColumn) => {
  const dispatch = useAppDispatch();
  const viewedArr = useAppSelector((state) => state.viewed.viewed);
  const willViewArr = useAppSelector((state) => state.willview.value);

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

  const [viewed, setViewed] = useState(false);
  const [planWatch, setPlanWatch] = useState(false);

  const rating = () => {
    let ratingArray: (number | null)[] = [];

    if (movie.rating) {
      ratingArray = Object.values(movie.rating);
      if (ratingArray === null) return 0;

      return Number(
        (ratingArray as number[]).reduce((sum, e) => {
          if (e === null) return sum;
          return sum + e;
        }, 0) / ratingArray.length
      ).toPrecision(2);
    }

    return 0;
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
  }, [movie.id, viewedArr, willViewArr]);

  return (
    <div className={classes.movie}>
      <div className={classes.wrapper}>
        <Link to={`/movies/${movie.id}`} className={classes.poster__info}>
          <div className={classes.icons}>
            <div
              className={classes.icon}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
                className={`fa-solid fa-eye movie-card__show-button ${classes.icon__active} ${
                  viewed && `movie-card__show-button__active`
                }`}
              />
            </div>
            <div
              className={classes.icon}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
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
                className={`fa-solid fa-bookmark movie-card__show-button ${classes.icon__active} ${
                  planWatch && `movie-card__show-button__active`
                }`}
              />
            </div>
          </div>
          <div className={classes.poster__description}>
            <div className={`fa-solid fa-star ${classes.star}`}>
              <div className={`${classes.rating}`}>{rating()}</div>
            </div>

            <div className={classes.description}>
              <span className={classes.description__info}>
                {movie.movieLength ? `${movie.movieLength} мин.` : ''}
              </span>
              <span className={classes.description__info}>
                {movie.year} <span className={classes.point}>●</span> {movie.countries![0]}
              </span>
              <span className={`${classes.description__info} ${classes.genres}`}>
                {movie.genres?.join(', ')}
              </span>
            </div>
          </div>
        </Link>
        {movie.poster ? (
          <img src={movie.poster} alt={movie.name || 'Постер фильма'} className={classes.poster} />
        ) : (
          <div className="poster-error">
            <i className="fa-solid fa-triangle-exclamation poster-error__icon" />
            Постер отсутствует
          </div>
        )}
      </div>
      <span className={classes.title}>{movie.name}</span>
    </div>
  );
};

export default MovieCardColumn;
