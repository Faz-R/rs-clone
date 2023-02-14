import { useAsyncValue } from 'react-router-dom';
import parseMoviesData from '@utils/parseMovieData';
import type { MovieDataInterface } from '@/types';

const MovieDetails = () => {
  const movieData = useAsyncValue() as MovieDataInterface;
  console.log(movieData);
  const [details] = parseMoviesData([movieData], 10);
  console.log(details);
  //! в ретурне все данные парси его и выводи
  return null;
};

export default MovieDetails;
