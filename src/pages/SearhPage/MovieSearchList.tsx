import type { MovieRandomInterface } from '../../types';

const MovieSearchList = (props: { movies: MovieRandomInterface[] }) => {
  const { movies } = props;
  return movies.length === 0 ? (
    <h2> Фильмы не найдены</h2>
  ) : (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.name}</li>
      ))}
    </ul>
  );
};

export default MovieSearchList;
