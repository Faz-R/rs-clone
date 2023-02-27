import MovieCardColumn from '@components/MovieCardColumn';
import type { AnyMovieInterface } from '@/types';

const MovieSearchList = (props: { movies: AnyMovieInterface[] }) => {
  const { movies } = props;
  return movies.length === 0 ? (
    <span className="search__movies-not-found">Фильмы не найдены</span>
  ) : (
    <div className="search__movies-list">
      {movies.map((movie) => (
        <MovieCardColumn movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default MovieSearchList;
