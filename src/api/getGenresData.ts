import { DOMAIN, TOKEN } from '../constants';

const getGenresData = async () => {
  const queryParams = `&selectFields=genres.name&limit=1000`;

  try {
    const response = await fetch(`${DOMAIN}/?token=${TOKEN}${queryParams}`);
    const { docs } = await response.json();
    const arrGenresAll = docs.map((r) => r.genres.map((r) => r.name));
    const arrGenres: string[] = Array.from(new Set(arrGenresAll.flat()));

    return { arrGenres };
  } catch (err) {
    const error = err as Error;
    console.error(error);
    return null;
  }
};

export default getGenresData;
