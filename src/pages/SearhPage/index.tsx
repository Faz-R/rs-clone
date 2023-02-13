import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '@components/UI/loader/Loader';
import SearchForm from '@components/SearchForm/';
import getMoviesBySearchName from '../../api/getMoviesBySearchName';
import MovieSearchList from './MovieSearchList';
import MovieSearchPagination from '../../components/Pafination';
import type { AnyMovieInterface } from '../../types';
import './index.scss';
import getNoun from '@utils/getWorldEnding';

const SearchPage = () => {
  const [state, setState] = useState<{
    movies: AnyMovieInterface[];
    page: number;
    pages: number;
    total: number;
  }>({ movies: [], page: 0, pages: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getMoviesBySearchName(location.state).then((data) => {
      setState(data);
      setLoading(false);
    });
  }, [location.state]);

  const { movies, page, pages, total } = state;

  const handleBtnClick = (step: 1 | -1) => {
    const newPage = page + step;
    setLoading(true);
    getMoviesBySearchName(location.state, newPage).then((data) => {
      setState(data);
      setLoading(false);
    });
  };

  return (
    <section className="search-page">
      {loading ? (
        <div className="search__loader">
          <Loader loading={loading} className="search__loader__icon" />
        </div>
      ) : (
        <>
          <div className="search__title">
            <i className="fa-solid fa-angles-right design__row" /> Поиск
          </div>
          <div className="search__top">
            <span className="search__subtitle">
              Найдено {total} {getNoun(total, 'фильм', 'фильма', 'фильмов')}
            </span>
            <MovieSearchPagination
              page={page}
              pages={pages}
              handleBtnClick={handleBtnClick}
              isMovies={movies.length !== 0}
            />
            <SearchForm />
          </div>
          <MovieSearchList movies={movies} />
        </>
      )}
    </section>
  );
};

export default SearchPage;
