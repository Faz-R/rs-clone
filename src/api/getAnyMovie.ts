import getRandomNumber from '@utils/getRandomNumber';
import getRandomGenres from '@utils/getRandomGenres';
import parseMoviesData from '@utils/parseMovieData';
import type { MovieDataInterface, SearchMovieFormData } from '@/types';
import { DOMAIN, FIELDS } from '../constants';

const TOKEN = import.meta.env.VITE_TOKEN;

const getAnyMovie = async (formData: SearchMovieFormData) => {
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
    const response = await fetch(`${DOMAIN}/?token=${TOKEN}${queryParams}&limit=100`);

    const { docs } = (await response.json()) as { docs: MovieDataInterface[] };

    const movies = parseMoviesData(docs);

    console.log(movies);

    const { exceptions } = formData;

    const result = exceptions ? movies.filter((movie) => !exceptions.includes(movie.id)) : movies;

    const index = getRandomNumber(result.length);

    console.log(result[index]);

    return result[index];
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return null;
  }
};

export default getAnyMovie;
