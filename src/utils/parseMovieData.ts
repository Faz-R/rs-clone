import type { MovieDataInterface, AnyMovieInterface, PersonType, CountryType } from '@/types';

const getMovieStaff = (persons: null | PersonType[]) => {
  const actors =
    persons
      ?.filter((person) => person.enProfession === 'actor')
      .slice(0, 3)
      .map((person) => person.enName) ?? null;

  const director = persons?.find((person) => person.enProfession === 'director')?.enName ?? null;

  return { actors, director };
};

const parseMoviesData = (movies: MovieDataInterface[]): AnyMovieInterface[] => {
  return movies.map((movie) => {
    const movieData = {
      id: movie.id,
      alternativeName: movie.alternativeName,
      name: movie.name,
      description: movie.description,
      genres: movie.genres?.map((genre: CountryType) => genre.name) ?? null,
      year: movie.year,
      movieLength: movie.movieLength,
      poster: movie.poster?.previewUrl ?? null,
      rating: { kp: movie.rating?.kp ?? null, imdb: movie.rating?.imdb ?? null },
      countries: movie.countries?.map((country: CountryType) => country.name) ?? null,
    };

    return { ...movieData, ...getMovieStaff(movie.persons) };
  });
};

export default parseMoviesData;
