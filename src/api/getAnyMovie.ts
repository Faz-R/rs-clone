import getRandomNumber from '@utils/getRandomNumber';
import getRandomGenres from '@utils/getRandomGenres';
import parseMoviesData from '@utils/parseMovieData';
import type { AnyMovieInterface, MovieDataInterface, SearchMovieFormData } from '@/types';
import { DOMAIN, FIELDS } from '../constants';

const TOKENS = import.meta.env.VITE_TOKENS.split(',');

const getAnyMovie = async (
  formData: SearchMovieFormData,
  counter: number
): Promise<AnyMovieInterface | null> => {
  let queryParams = FIELDS;

  const matrixData = Object.entries(formData);

  matrixData.forEach(([key, value]) => {
    if (key === 'rating') {
      queryParams += `&field=${key}.kp&search=${value}`;
      queryParams += `&field=${key}.imdb&search=${value}`;
    }

    if (key === 'genres') {
      if (value.length) {
        value.forEach((name: string) => {
          queryParams += `&field=${key}.name&search=${name}`;
        });
      } else {
        queryParams += getRandomGenres();
      }
    }

    if (key === 'year') {
      queryParams += `&field=${key}&search=${value}`;
    }
  });

  try {
    const response = await fetch(`${DOMAIN}/?token=${TOKENS[counter]}${queryParams}&limit=100`);
    if (!response.ok && response.status === 401 && counter < TOKENS.length) {
      const result = await getAnyMovie(formData, counter + 1);
      return result;
    }

    const { docs } = (await response.json()) as { docs: MovieDataInterface[] };

    const movies = parseMoviesData(docs, 3);

    const { exceptions } = formData;

    const result = exceptions ? movies.filter((movie) => !exceptions.includes(movie.id)) : movies;

    const index = getRandomNumber(result.length);

    return result[index];
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return null;
  }
};

export default getAnyMovie;
