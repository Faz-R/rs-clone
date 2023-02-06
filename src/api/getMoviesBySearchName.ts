import type { MovieRandomInterface, ResponseSearchMovieInterface } from '../types';
import { DOMAIN, TOKEN, FIELDS_RANDOM } from '../constants';
import parseMoviesData from '../tools/parseMovieData';

const getMoviesBySearchName = async (name: string, currentPage = 1) => {
  const queryParams = `${FIELDS_RANDOM}&field=name&search=${name}&page=${currentPage}`;
  try {
    const response = await fetch(`${DOMAIN}/?token=${TOKEN}${queryParams}`);
    const { docs, page, pages } = (await response.json()) as ResponseSearchMovieInterface;

    const movies = parseMoviesData(docs, true) as MovieRandomInterface[];
    return { movies, page, pages };
  } catch (e) {
    const err = e as Error;
    console.error(err);
    return { movies: [], page: 0, pages: 0 };
  }
};

export default getMoviesBySearchName;
