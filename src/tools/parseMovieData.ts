import type {
  MovieDataInterface,
  MovieHumorInterface,
  MovieRandomInterface,
  PersonType,
} from '../type';

const getActorsFromMovieData = (persons: PersonType[]) => {
  return persons
    .filter((person) => person.enProfession === 'actor')
    .slice(0, 3)
    .map((person) => person.enName);
};

const getProducerFromMovieData = (persons: PersonType[]) => {
  return persons.find((person) => person.enProfession === 'director')?.enName ?? '';
};

const parseMoviesData = (
  movies: MovieDataInterface[],
  random: boolean
): MovieHumorInterface[] | MovieRandomInterface[] => {
  return movies.map((movie) => {
    const { id, name, description, genres, poster, year, movieLength, rating, persons, countries } =
      movie;

    const actors = getActorsFromMovieData(persons);
    const director = getProducerFromMovieData(persons);

    const movieData = {
      id,
      name,
      description,
      genres: genres.map((genre) => genre.name),
      year,
      movieLength,
      poster: poster?.previewUrl ?? null,
      rating: { kp: rating.kp, imdb: rating.imdb },
      countries: countries.map((country) => country.name),
    };

    return random ? { ...movieData, actors, director } : movieData;
  });
};

export default parseMoviesData;
