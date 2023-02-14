import { defer, LoaderFunction } from 'react-router-dom';

import { DOMAIN, FIELDS } from '../constants';

const TOKEN = import.meta.env.VITE_TOKEN;

const getMovieById = async (id: string) => {
  const response = await fetch(`${DOMAIN}/?token=${TOKEN}${FIELDS}&field=id&search=${id}`);

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

  return defer({ movie: getMovieById(id) });
};

export default loaderMovieDetails;
