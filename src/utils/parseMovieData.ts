import type {
  MovieDataInterface,
  MovieHumorInterface,
  MovieRandomInterface,
  PersonType,
  CountryType,
} from '../types';

const getActorsFromMovieData = (persons?: PersonType[]) => {
  return persons
    ? persons
        .filter((person) => person.enProfession === 'actor')
        .slice(0, 3)
        .map((person) => person.enName)
    : [];
};

const getProducerFromMovieData = (persons?: PersonType[]) => {
  return persons ? persons.find((person) => person.enProfession === 'director')?.enName ?? '' : '';
};

const parseMoviesData = (
  movies: MovieDataInterface[],
  random: boolean
): MovieHumorInterface[] | MovieRandomInterface[] => {
  return movies.map((movie) => {
    const {
      id,
      alternativeName,
      name,
      description,
      genres,
      poster,
      year,
      movieLength,
      rating,
      persons,
      countries,
    } = movie;

    const actors = getActorsFromMovieData(persons);
    const director = getProducerFromMovieData(persons);

    const movieData = {
      id,
      alternativeName,
      name,
      description,
      genres: genres.map((genre: CountryType) => genre.name),
      year,
      movieLength,
      poster: poster?.previewUrl ?? null,
      rating: { kp: rating.kp, imdb: rating.imdb },
      countries: countries.map((country: CountryType) => country.name),
    };

    return random ? { ...movieData, actors, director } : movieData;
  });
};

export default parseMoviesData;
