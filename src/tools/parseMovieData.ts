import getActorsFromMovieData from './getActorsFromMovieData';
import getProducerFromMovieData from './getProducerFromMovieData';
import type { MovieDataInterface, MovieHumorInterface, MovieRandomInterface } from '../type';

const parseMoviesData = (
  movies: MovieDataInterface[],
  random: boolean
): MovieHumorInterface[] | MovieRandomInterface[] => {
  return movies.map((movie) => {
    const { id, name, description, genres, poster, year, movieLength, rating, persons, premiere } =
      movie;

    const actors = getActorsFromMovieData(persons);
    const director = getProducerFromMovieData(persons);

    const movieData = {
      id,
      name,
      description,
      genres,
      year,
      movieLength,
      poster: poster?.previewUrl ?? null,
      rating: { kp: rating.kp, imdb: rating.imdb },
      country: premiere?.country ?? null,
    };

    return random ? { ...movieData, actors, director } : movieData;
  });
};

export default parseMoviesData;
