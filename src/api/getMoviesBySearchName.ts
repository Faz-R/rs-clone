import parseMoviesData from '../utils/parseMovieData';
import type { MovieRandomInterface, ResponseSearchMovieInterface } from '../types';
import { DOMAIN, FIELDS_RANDOM } from '../constants';

const TOKEN = import.meta.env.VITE_TOKEN;

const getMoviesBySearchName = async (name: string, currentPage = 1) => {
  const isEnglish = /[a-z]/i.test(name);

  const queryParams = `${FIELDS_RANDOM}&field=${
    isEnglish ? 'alternativeName' : 'name'
  }&search=${name}&page=${currentPage}`;

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
