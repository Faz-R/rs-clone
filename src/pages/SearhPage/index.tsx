import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getMoviesBySearchName from '../../api/getMoviesBySearchName';
import MovieSearchList from './MovieSearchList';
import MovieSearchPagination from './MovieSearchPagination';
import type { MovieRandomInterface } from '../../types';

const SearchPage = () => {
  const [state, setState] = useState<{
    movies: MovieRandomInterface[];
    page: number;
    pages: number;
  }>({ movies: [], page: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getMoviesBySearchName(location.state).then((data) => {
      setState(data);
      setLoading(false);
    });
  }, [location.state]);

  const { movies, page, pages } = state;

  const handleBtnClick = (step: 1 | -1) => {
    const newPage = page + step;
    setLoading(true);
    getMoviesBySearchName(location.state, newPage).then((data) => {
      setState(data);
      setLoading(false);
    });
  };

  return (
    <section className="main-page">
      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <>
          <MovieSearchList movies={movies} />
          <MovieSearchPagination
            page={page}
            pages={pages}
            handleBtnClick={handleBtnClick}
            isMovies={movies.length !== 0}
          />
        </>
      )}
    </section>
  );
};

export default SearchPage;
