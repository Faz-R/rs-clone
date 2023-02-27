/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import MovieSearchPagination from '@components/Pagination';
import MovieCardColumn from '@components/MovieCardColumn';
import Loader from '@components/UI/loader/Loader';
import getNoun from '@utils/getWorldEnding';
import Select from '@components/UI/select/Select';
import { changePageToViewed, changeSortToViewed } from '@store/viewedSlice';
import { AnyMovieInterface } from '@/types';
import './index.scss';

let sorted: AnyMovieInterface[] = [];

const Viewed = () => {
  const [loading, setLoading] = useState(false);
  const viewed = useAppSelector((state) => state.viewed.viewed);
  const [movies, setMovies] = useState(useAppSelector((state) => state.viewed.viewed));
  const pageForReboot = useAppSelector((state) => state.viewed.page) || 1;
  const sortFromState = useAppSelector((state) => state.viewed.sort) || '';
  const dispatch = useAppDispatch();

  const [selectSort, setSelectSort] = useState<string | number>(sortFromState);

  const rating = ({ imdb: a, kp: b }: { imdb: number | null; kp: number | null }) => {
    return ((a || 0) + (b || 0)) / 2;
  };

  const [moviesPerPage, setMoviesPerPage] = useState(1);
  const sortMovies = (sort: string | number) => {
    setSelectSort(sort);
    dispatch(changeSortToViewed(sort));
    switch (sort) {
      case 'rating-hight':
        setMovies([...viewed].sort((a, b) => rating(b.rating) - rating(a.rating)));
        break;

      case 'rating-low':
        setMovies([...viewed].sort((a, b) => rating(a.rating) - rating(b.rating)));
        break;

      case 'new':
        setMovies([...viewed].sort((a, b) => (b.year || 0) - (a.year || 0)));
        break;

      case 'old':
        setMovies([...viewed].sort((a, b) => (a.year || 0) - (b.year || 0)));
        break;

      case 'name':
        setMovies([...viewed].sort((a, b) => (a[sort] || '').localeCompare(b[sort] || '')));
        break;

      default:
        break;
    }
  };

  const [state, setState] = useState({
    page: movies.length !== 0 ? pageForReboot || 1 : 0,
    pages: Math.ceil(movies.length / moviesPerPage),
  });

  if (state.page > state.pages) {
    setState({ ...state, page: state.pages });
    dispatch(changePageToViewed(state.pages));
  }

  sorted = movies.slice((state.page - 1) * moviesPerPage, state.page * moviesPerPage);

  useEffect(() => {
    setMovies(viewed);
    sortMovies(selectSort);

    if (window.innerWidth > 1000) {
      setMoviesPerPage(10);
    }
    if (window.innerWidth <= 1000) {
      setMoviesPerPage(8);
    }

    if (window.innerWidth <= 800) {
      setMoviesPerPage(6);
    }

    if (window.innerWidth <= 600) {
      setMoviesPerPage(4);
    }

    if (window.innerWidth <= 400) {
      setMoviesPerPage(1);
    }

    setState({ ...state, pages: Math.ceil(viewed.length / moviesPerPage) });
  }, [viewed, moviesPerPage, window]);

  const handleBtnClick = (step: 1 | -1) => {
    setLoading(true);
    setState({ ...state, page: state.page + step });
    dispatch(changePageToViewed(pageForReboot + step));
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
              {movies.length
                ? `${getNoun(movies.length, 'Просмотрен', 'Просмотрено', 'Просмотрено')} ${
                    movies.length
                  } ${getNoun(movies.length, 'фильм', 'фильма', 'фильмов')}`
                : `Фильмов пока нет`}
            </span>
            {movies.length ? (
              <div className="pagination-select">
                <MovieSearchPagination
                  page={state.page}
                  pages={state.pages}
                  handleBtnClick={handleBtnClick}
                  isMovies={movies.length !== 0}
                />
                <Select
                  defaultValue="Сортировать"
                  options={[
                    { value: 'rating-hight', name: 'Высокий рейтинг', id: 1 },
                    { value: 'rating-low', name: 'Низкий рейтинг', id: 2 },
                    { value: 'new', name: 'Сначала новые', id: 3 },
                    { value: 'old', name: 'Сначала старые', id: 4 },
                    { value: 'name', name: 'По названию', id: 5 },
                  ]}
                  value={selectSort}
                  onChange={sortMovies}
                />
              </div>
            ) : (
              ''
            )}
          </div>
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
