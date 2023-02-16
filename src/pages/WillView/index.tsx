/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import Select from '@components/UI/select/Select';
import MovieSearchPagination from '@components/Pagination';
import MovieCardColumn from '@components/MovieCardColumn';
import Loader from '@components/UI/loader/Loader';
import getNoun from '@utils/getWorldEnding';
import { AnyMovieInterface } from '@/types';
import '../Viewed/index.scss';

let sorted: AnyMovieInterface[] = [];

const WillView = () => {
  const [loading, setLoading] = useState(false);
  const willView = useAppSelector((state) => state.willview.value);
  const [movies, setMovies] = useState(willView);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const [selectSort, setSelectSort] = useState<string | number>('');

  const rating = ({ imdb: a, kp: b }: { imdb: number | null; kp: number | null }) => {
    return ((a || 0) + (b || 0)) / 2;
  };

  const sortMovies = (sort: string | number) => {
    setSelectSort(sort);
    switch (sort) {
      case 'rating-hight':
        setMovies([...willView].sort((a, b) => rating(b.rating) - rating(a.rating)));
        break;

      case 'rating-low':
        setMovies([...willView].sort((a, b) => rating(a.rating) - rating(b.rating)));
        break;

      case 'new':
        setMovies([...willView].sort((a, b) => (b.year || 0) - (a.year || 0)));
        break;

      case 'old':
        setMovies([...willView].sort((a, b) => (a.year || 0) - (b.year || 0)));
        break;

      case 'name':
        setMovies([...willView].sort((a, b) => (a[sort] || '').localeCompare(b[sort] || '')));
        break;

      case 'time-hight':
        setMovies([...willView].sort((a, b) => (b.movieLength || 0) - (a.movieLength || 0)));
        break;

      case 'time-low':
        setMovies([...willView].sort((a, b) => (a.movieLength || 0) - (b.movieLength || 0)));
        break;

      default:
        break;
    }
  };

  const [state, setState] = useState({
    page: movies.length !== 0 ? 1 : 0,
    pages: Math.ceil(movies.length / moviesPerPage),
  });

  if (state.page > state.pages) setState({ ...state, page: state.pages });

  sorted = movies.slice((state.page - 1) * moviesPerPage, state.page * moviesPerPage);

  useEffect(() => {
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
    setState({ ...state, pages: Math.ceil(willView.length / moviesPerPage) });
    setMovies(willView);
    sortMovies(selectSort);
  }, [willView, moviesPerPage, window]);

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
            <i className="fa-solid fa-angles-right design__row" /> Буду смотреть
          </div>
          <div className="viewed__top">
            <span className="viewed__subtitle">
              {movies.length
                ? `${getNoun(movies.length, 'Запланирован', 'Запланировано', 'Запланировано')} ${
                    movies.length
                  } ${getNoun(movies.length, 'фильм', 'фильма', 'фильмов')}`
                : `Фильмов пока нет`}
            </span>
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
                  { value: 'time-hight', name: 'Сначала долгие', id: 6 },
                  { value: 'time-low', name: 'Сначала короткие', id: 7 },
                ]}
                value={selectSort}
                onChange={sortMovies}
              />
            </div>
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

export default WillView;
