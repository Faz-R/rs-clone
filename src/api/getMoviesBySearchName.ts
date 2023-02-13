import parseMoviesData from '@utils/parseMovieData';
import type { AnyMovieInterface, ResponseSearchMovieInterface } from '@/types';
import { DOMAIN, FIELDS } from '../constants';

const TOKEN = import.meta.env.VITE_TOKEN;

const getMoviesBySearchName = async (name: string, currentPage = 1) => {
  const isEnglish = /[a-z]/i.test(name);

  const queryParams = `${FIELDS}&field=${
    isEnglish ? 'alternativeName' : 'name'
  }&search=${name}&page=${currentPage}`;

  try {
    const response = await fetch(`${DOMAIN}/?token=${TOKEN}${queryParams}`);

    const { docs, page, pages, total } = (await response.json()) as ResponseSearchMovieInterface;
    console.log(docs);
    const movies = parseMoviesData(docs, 3) as AnyMovieInterface[];
    console.log(movies);
    return { movies, page, pages, total };
  } catch (e) {
    const err = e as Error;
    console.error(err);
    return { movies: [], page: 0, pages: 0, total: 0 };
  }
};

export default getMoviesBySearchName;
