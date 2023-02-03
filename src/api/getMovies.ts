import type { MovieDataInterface, MovieInterface, SearchFormData } from '../type';
import { DOMAIN, TOKEN } from '../constants';
import getRandomNumber from '../tools/getRandomNumber';

const getMovies = async (
  formData: SearchFormData,
  random: boolean
): Promise<MovieInterface[] | MovieInterface> => {
  let queryParams = '';

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

    const movies: MovieInterface[] = docs.map((movie) => {
      const { id, poster, name, description, rating, year } = movie;
      return {
        id,
        name,
        description,
        year,
        poster: poster?.previewUrl ?? null,
        rating: { kp: rating.kp, imdb: rating.imdb },
      };
    });

    const exceptions = formData.exceptions ?? [];
    const result = movies.filter((movie) => !exceptions.includes(movie.id));
    return random ? result[getRandomNumber(result.length)] : result;
  } catch (e) {
    const err = e as Error;
    console.error(err);
    return [];
  }
};

export default getMovies;
