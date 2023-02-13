import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import MovieDetails from '@components/MovieDetails';
import type { MovieDataInterface } from '@/types';

const Movie = () => {
  const { movie } = useLoaderData() as { movie: Promise<MovieDataInterface> };

  return (
    //! в фоллбек вставляй н спиннер
    <Suspense fallback={<h2>Loader must be here...</h2>}>
      <Await resolve={movie}>
        <MovieDetails />
      </Await>
    </Suspense>
  );
};

export default Movie;
