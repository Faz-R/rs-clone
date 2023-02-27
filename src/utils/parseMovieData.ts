import type { MovieDataInterface, AnyMovieInterface } from '@/types';
import getTrailer from './getTrailer';

const getMovieStaff = (
  persons: null | { name: string; enProfession: string }[],
  actorsNumber: number
) => {
  const actors =
    persons
      ?.filter((person) => person.enProfession === 'actor')
      .slice(0, actorsNumber)
      .map((person) => person.name) ?? null;

  const director = persons?.find((person) => person.enProfession === 'director')?.name ?? null;

  return { actors, director };
};

const parseMoviesData = (
  movies: MovieDataInterface[],
  actorsNumber: number
): AnyMovieInterface[] => {
  return movies.map((movie) => {
    const movieData = {
      id: movie.id,
      alternativeName: movie.alternativeName,
      name: movie.name,
      description: movie.description,
      genres: movie.genres?.map(({ name }: { name: string }) => name) ?? null,
      year: movie.year,
      movieLength: movie.movieLength,
      poster: movie.poster?.previewUrl ?? null,
      rating: { kp: movie.rating?.kp ?? null, imdb: movie.rating?.imdb ?? null },
      countries: movie.countries?.map(({ name }: { name: string }) => name) ?? null,
      trailer: getTrailer(movie.videos?.trailers),
    };

    return { ...movieData, ...getMovieStaff(movie.persons, actorsNumber) };
  });
};

export default parseMoviesData;
