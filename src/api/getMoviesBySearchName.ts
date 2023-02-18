import parseMoviesData from '@utils/parseMovieData';
import type { AnyMovieInterface, ResponseSearchMovieInterface } from '@/types';
import { DOMAIN, FIELDS } from '../constants';

const TOKENS = import.meta.env.VITE_TOKENS.split(',');

const getMoviesBySearchName = async (
  name: string,
  counter: number,
  limit: number,
  currentPage = 1
): Promise<{ movies: AnyMovieInterface[]; page: number; pages: number; total: number }> => {
  const isEnglish = /[a-z]/i.test(name);

  const queryParams = `${FIELDS}&field=${
    isEnglish ? 'alternativeName' : 'name'
  }&search=${name}&page=${currentPage}`;

  try {
    const response = await fetch(
      `${DOMAIN}/?token=${TOKENS[counter]}${queryParams}&limit=${limit}`
    );

    if (!response.ok && response.status === 401 && counter < TOKENS.length) {
      const result = await getMoviesBySearchName(name, counter + 1, limit, currentPage);
      return result;
    }

    const { docs, page, pages, total } = (await response.json()) as ResponseSearchMovieInterface;
    const movies = parseMoviesData(docs, 3) as AnyMovieInterface[];
    return { movies, page, pages, total };
  } catch (e) {
    const err = e as Error;
    console.error(err);
    return { movies: [], page: 0, pages: 0, total: 0 };
  }
};

export default getMoviesBySearchName;
