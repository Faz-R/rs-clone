import { defer, LoaderFunction } from 'react-router-dom';

import { DOMAIN, FIELDS } from '../constants';

const TOKENS = import.meta.env.VITE_TOKENS.split(',');

const getMovieById = async (id: string, counter: number): Promise<Response> => {
  const response = await fetch(
    `${DOMAIN}/?token=${TOKENS[counter]}${FIELDS}&field=id&search=${id}`
  );

  if (!response.ok && response.status === 401 && counter < TOKENS.length) {
    const result = await getMovieById(id, counter + 1);
    return result;
  }

  if (!response.ok) {
    throw new Response('', {
      status: response.status,
      statusText: response.statusText || 'An error has occurred',
    });
  }

  return response.json();
};

const loaderMovieDetails: LoaderFunction = async ({ params }) => {
  const { id } = params as { id: string };

  return defer({ movie: getMovieById(id, 0) });
};

export default loaderMovieDetails;
