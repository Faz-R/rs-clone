import type { AnyMovieInterface } from '@/types';

const getPropsMap = (movies: AnyMovieInterface[], key: 'genres' | 'actors' | 'director') => {
  return movies
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
};

const getFavoriteData = (movies: AnyMovieInterface[], key: 'genres' | 'actors' | 'director') => {
  const propsMap = getPropsMap(movies, key);

  const favoriteProps = Object.entries(propsMap)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5);

  return Object.fromEntries(favoriteProps);
};

const getGenresDiagram = (movies: AnyMovieInterface[]) => {
  const propsMap = getPropsMap(movies, 'genres');

  const keys = Object.keys(propsMap);

  const total = keys.reduce((acc, key) => acc + propsMap[key], 0);

  keys.forEach((key) => {
    propsMap[key] = ((propsMap[key] / total) * 100).toFixed(2);
  });
  return propsMap;
};

const getViewerLevel = (amount: number) => {
  switch (true) {
    case amount <= 20:
      return 'начинающий киноман';
    case amount <= 50:
      return 'любитель попкорна';
    case amount <= 100:
      return 'киногурман';
    case amount <= 300:
      return 'кинокритик';
    default:
      return 'киноэксперт';
  }
};

const getStatistics = (movies: AnyMovieInterface[]) => {
  return {
    amountMovies: movies.length,
    amountTimes: movies.reduce((acc, movie) => acc + (movie?.movieLength ?? 0), 0),
    favoriteGenres: getFavoriteData(movies, 'genres'),
    favoriteActors: getFavoriteData(movies, 'actors'),
    favoriteDirectors: getFavoriteData(movies, 'director'),
    genresDiagram: getGenresDiagram(movies),
    viewerMovieLevel: getViewerLevel(movies.length),
  };
};

export default getStatistics;
