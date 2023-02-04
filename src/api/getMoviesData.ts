import type { MovieDataInterface, SearchMovieFormData } from '../types';
import { DOMAIN, TOKEN, FIELDS_HUMOR, FIELDS_RANDOM } from '../constants';
import getRandomNumber from '../tools/getRandomNumber';
import parseMoviesData from '../tools/parseMovieData';

const getMoviesData = async (formData: SearchMovieFormData, random: boolean) => {
  let queryParams = random ? FIELDS_RANDOM : FIELDS_HUMOR;

  const matrixData = Object.entries(formData);

  for (const [key, value] of matrixData) {
    if (key === 'rating') {
      queryParams += `&field=${key}.kp&search=${value}`;
      queryParams += `&field=${key}.imdb&search=${value}`;
    }

    if (key === 'genres') {
      value.forEach((name: string) => {
        queryParams += `&field=${key}.name&search=${name}`;
      });
    }

    if (key === 'year') {
      queryParams += `&field=${key}&search=${value}`;
    }
  }

  try {
    const response = await fetch(`${DOMAIN}/?token=${TOKEN}${queryParams}`);
    const { docs } = (await response.json()) as { docs: MovieDataInterface[] };

    const movies = parseMoviesData(docs, random);

    const { exceptions } = formData;

    const result = exceptions ? movies.filter((movie) => !exceptions.includes(movie.id)) : movies;

    return random ? result[getRandomNumber(result.length)] : result;
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return null;
  }
};

export default getMoviesData;
