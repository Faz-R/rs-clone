import type { AnyMovieInterface } from '@/types';

const getFavoriteData = (movies: AnyMovieInterface[], key: 'genres' | 'actors' | 'director') => {
  const propsMap = movies
    .map((movie) => movie[key])
    .flat()
    .reduce((acc, props) => {
      if (!props) return acc;
      if (Object.hasOwn(acc, props)) {
        acc[props] += 1;
      } else {
        acc[props] = 1;
      }
      return acc;
    }, Object.create(null));

  const favoriteProps = Object.entries(propsMap)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5);

  return Object.fromEntries(favoriteProps);
};

const getStatistics = (movies: AnyMovieInterface[]) => {
  const amountMovies = movies.length;
  const amountTimes = movies.reduce((acc, movie) => acc + (movie?.movieLength ?? 0), 0);
  const favoriteGenres = getFavoriteData(movies, 'genres');
  const favoriteActors = getFavoriteData(movies, 'actors');
  const favoriteDirectors = getFavoriteData(movies, 'director');

  return { amountMovies, amountTimes, favoriteGenres, favoriteActors, favoriteDirectors };
};

export default getStatistics;
