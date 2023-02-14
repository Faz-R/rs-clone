/* eslint-disable import/extensions */
import { useState } from 'react';
import { useAppSelector } from '@store/hooks';
import MovieSearchPagination from '@components/Pagination';
import MovieCardColumn from '@components/MovieCardColumn';
import Loader from '@components/UI/loader/Loader';
import getNoun from '@utils/getWorldEnding';
import Select from '@components/UI/select/Select';
import { AnyMovieInterface } from '@/types';
import './index.scss';

let sorted: AnyMovieInterface[] = [];
const moviesPerPage = 10;

const Viewed = () => {
  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState(useAppSelector((state) => state.viewed.viewed));

  const [selectSort, setSelectSort] = useState<string | number>('');

  const rating = ({ imdb: a, kp: b }: { imdb: number | null; kp: number | null }) => {
    return ((a || 0) + (b || 0)) / 2;
  };

  const sortMovies = (sort: string | number) => {
    setSelectSort(sort);
    switch (sort) {
      case 'rating-hight':
        setMovies([...movies].sort((a, b) => rating(b.rating) - rating(a.rating)));
        break;

      case 'rating-low':
        setMovies([...movies].sort((a, b) => rating(a.rating) - rating(b.rating)));
        break;

      case 'new':
        setMovies([...movies].sort((a, b) => (b.year || 0) - (a.year || 0)));
        break;

      case 'old':
        setMovies([...movies].sort((a, b) => (a.year || 0) - (b.year || 0)));
        break;

      case 'name':
        setMovies([...movies].sort((a, b) => (a[sort] || '').localeCompare(b[sort] || '')));
        break;

      default:
        break;
    }
  };

  const [state, setState] = useState({
    page: movies.length !== 0 ? 1 : 0,
    pages: Math.ceil(movies.length / moviesPerPage),
  });

  sorted = movies.slice((state.page - 1) * moviesPerPage, state.page * moviesPerPage);

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
              {movies.length
                ? `${getNoun(movies.length, 'Просмотрен', 'Просмотрено', 'Просмотрено')} ${
                    movies.length
                  } ${getNoun(movies.length, 'фильм', 'фильма', 'фильмов')}`
                : `Фильмов пока нет`}
            </span>
            <MovieSearchPagination
              page={state.page}
              pages={state.pages}
              handleBtnClick={handleBtnClick}
              isMovies={movies.length !== 0}
            />
            <Select
              defaultValue="Сортировать"
              options={[
                { value: 'rating-hight', name: 'Высокий рейтинг' },
                { value: 'rating-low', name: 'Низкий рейтинг' },
                { value: 'new', name: 'Сначала новые' },
                { value: 'old', name: 'Сначала старые' },
                { value: 'name', name: 'По названию' },
              ]}
              value={selectSort}
              onChange={sortMovies}
            />
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
