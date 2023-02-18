import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '@components/UI/loader/Loader';
import SearchForm from '@components/SearchForm/';
import getNoun from '@utils/getWorldEnding';
import getMoviesBySearchName from '@api/getMoviesBySearchName';
import MovieSearchPagination from '@components/Pagination';
import MovieSearchList from './MovieSearchList';
import type { AnyMovieInterface } from '@/types';
import './index.scss';

const SearchPage = () => {
  const [state, setState] = useState<{
    movies: AnyMovieInterface[];
    page: number;
    pages: number;
    total: number;
  }>({ movies: [], page: 0, pages: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const location = useLocation();

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
    setLoading(true);
    getMoviesBySearchName(location.state, 0, moviesPerPage).then((data) => {
      setState(data);
      setLoading(false);
    });
  }, [location.state, moviesPerPage]);

  const { movies, page, pages, total } = state;

  const handleBtnClick = (step: 1 | -1) => {
    const newPage = page + step;
    setLoading(true);
    getMoviesBySearchName(location.state, 0, moviesPerPage, newPage).then((data) => {
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
            <div className="search-pagination">
              <MovieSearchPagination
                page={page}
                pages={pages}
                handleBtnClick={handleBtnClick}
                isMovies={movies.length !== 0}
              />
              <SearchForm />
            </div>
          </div>
          <MovieSearchList movies={movies} />
        </>
      )}
    </section>
  );
};

export default SearchPage;
