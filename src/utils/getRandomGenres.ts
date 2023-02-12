import { GENRES } from '../constants';
import getRandomNumber from './getRandomNumber';

const getRandomGenres = () => {
  const randomGenres: string[] = [];

  while (randomGenres.length < 3) {
    const genre = GENRES[getRandomNumber(GENRES.length)];

    if (!randomGenres.includes(genre)) {
      randomGenres.push(genre);
    }
  }

  console.log(randomGenres);

  const queryParams = randomGenres.map((genre) => `&field=genres.name&search=${genre}`);

  return queryParams.join('');
};

export default getRandomGenres;
