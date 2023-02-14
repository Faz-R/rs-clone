/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import Button from '@components/UI/button/Button';
import MovieSearchPagination from '@components/Pagination';
import MovieCardColumn from '@components/MovieCardColumn';
import Loader from '@components/UI/loader/Loader';
import getNoun from '@utils/getWorldEnding';
import { AnyMovieInterface } from '@/types';
import './index.scss';

let asc = true;
let sorted: AnyMovieInterface[] = [];
const moviesPerPage = 10;

const Viewed = () => {
  const [loading, setLoading] = useState(false);

  const viewedArr = useAppSelector((state) => state.viewed.viewed);

  const arrForRateKpAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => {
      return a.rating.kp && b.rating.kp ? a.rating.kp - b.rating.kp : 0;
    });
  const arrForRateKpDsc = arrForRateKpAsc.map((item) => item).reverse();
  const arrForRateImdbAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => {
      return a.rating.imdb && b.rating.imdb ? a.rating.imdb - b.rating.imdb : 0;
    });

  const arrForRateImdbDsc = arrForRateImdbAsc.map((item) => item).reverse();
  const arrForYearAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => {
      return a.year && b.year ? a.year - b.year : 0;
    });
  const arrForYearDsc = arrForYearAsc.map((item) => item).reverse();
  const arrForGenresAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => (a.genres && b.genres && a.genres[0] > b.genres[0] ? 1 : -1));
  const arrForGenresDsc = arrForGenresAsc.map((item) => item).reverse();

  const [sort, setSort] = useState(arrForRateKpAsc);

  const [state, setState] = useState({
    page: sort.length !== 0 ? 1 : 0,
    pages: Math.ceil(sort.length / moviesPerPage),
  });

  sorted = sort.slice((state.page - 1) * moviesPerPage, state.page * moviesPerPage);

  const sortByRatingKp = () => {
    if (asc) setSort(arrForRateKpAsc);
    else setSort(arrForRateKpDsc);
    asc = !asc;
  };

  const sortByRatingImdb = () => {
    if (asc) setSort(arrForRateImdbAsc);
    else setSort(arrForRateImdbDsc);
    asc = !asc;
  };

  const sortByYear = () => {
    if (asc) setSort(arrForYearAsc);
    else setSort(arrForYearDsc);
    asc = !asc;
  };

  const sortByGenr = () => {
    if (asc) {
      setSort(arrForGenresAsc);
    } else {
      setSort(arrForGenresDsc);
    }
    asc = !asc;
  };

  const handleBtnClick = (step: 1 | -1) => {
    setLoading(true);
    setState({ ...state, page: state.page + step });
    setLoading(false);
  };

  return (
    <section className="viewed-page">
      {loading ? (
        <div className="viewed__loader">
          <Loader loading={loading} className="viewed__loader__icon" />
        </div>
      ) : (
        <>
          <div className="viewed__title">
            <i className="fa-solid fa-angles-right design__row" /> Просмотренные
          </div>
          <div className="viewed__top">
            <span className="viewed__subtitle">
              {viewedArr.length
                ? `${getNoun(viewedArr.length, 'Просмотрен', 'Просмотрено', 'Просмотрено')} ${
                    viewedArr.length
                  } ${getNoun(viewedArr.length, 'фильм', 'фильма', 'фильмов')}`
                : `Фильмов пока нет`}
            </span>
            <MovieSearchPagination
              page={state.page}
              pages={state.pages}
              handleBtnClick={handleBtnClick}
              isMovies={viewedArr.length !== 0}
            />
          </div>
          {/* <Button children="по рейтингу кинопоиска" onClick={sortByRatingKp} />
          <Button children="по рейтингу IMDB" onClick={sortByRatingImdb} />
          <Button children="по году" onClick={sortByYear} />
          <Button children="по жанру" onClick={sortByGenr} /> */}
          {sorted.length !== 0 ? (
            <div className="viewed__movies-list">
              {sorted.map((movie) => (
                <MovieCardColumn movie={movie} key={movie.id} />
              ))}
            </div>
          ) : (
            ''
          )}
        </>
      )}
    </section>
  );
};

export default Viewed;
