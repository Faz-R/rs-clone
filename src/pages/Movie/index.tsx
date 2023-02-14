import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import MovieDetails from '@components/MovieDetails';
import Loader from '@components/UI/loader/Loader';
import type { MovieDataInterface } from '@/types';
import classes from './index.module.scss';

const Movie = () => {
  const { movie } = useLoaderData() as { movie: Promise<MovieDataInterface> };

  return (
    <Suspense
      fallback={
        <div className={classes.loader}>
          <Loader loading className={classes.icon} />
        </div>
      }>
      <Await resolve={movie}>
        <MovieDetails />
      </Await>
    </Suspense>
  );
};

export default Movie;
