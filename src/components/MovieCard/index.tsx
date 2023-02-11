/* eslint-disable react/no-children-prop */
import './index.css';
import Button from '../UI/button/Button';
import { addMovieToViewed, removeMovieFromViewed } from '../../store/viewedSlice';
import { addMovieToWillView, removeMovieFromWillView } from '../../store/willViewSlice';
import { MovieHumorInterface } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IMovieCardProps {
  id: string;
  className: string;
  poster: string;
  movie: MovieHumorInterface;
}

const MovieCard = ({ id, poster, className = '', movie }: IMovieCardProps) => {
  const dispatch = useAppDispatch();
  const idArr = useAppSelector((state) => state.viewed.viewed);
  const idArrWillWiew = useAppSelector((state) => state.willview.value);
  const children = !idArr.some((item) => movie.id === item.id)
    ? 'в просмотренные'
    : 'из просмотренных';
  const childrenWill = !idArrWillWiew.some((item) => movie.id === item.id)
    ? 'буду смотреть'
    : 'не буду смотреть';

  const setWillView = () => {
    if (!idArrWillWiew.some((item) => movie.id === item.id)) {
      dispatch(
        addMovieToWillView({
          id: movie.id,
          name: movie.name,
          countries: movie.countries,
          genres: movie.genres,
          description: movie.description,
          poster: movie.poster,
          rating: movie.rating.kp,
          year: movie.year,
        })
      );
    } else {
      dispatch(removeMovieFromWillView(movie.id));
    }
  };

  const setViewed = () => {
    if (!idArr.some((item) => movie.id === item.id)) {
      dispatch(
        addMovieToViewed({
          id: movie.id,
          name: movie.name,
          countries: movie.countries,
          genres: movie.genres,
          description: movie.description,
          poster: movie.poster,
          rating: movie.rating.kp,
          year: movie.year,
        })
      );
    } else {
      dispatch(removeMovieFromViewed(movie.id));
    }
  };

  return (
    <div id={id} className={className}>
      <img src={poster} alt="нет картинки" className={`img_movie_card ${className}`} />
      <Button children={children} onClick={setViewed} />
      <Button children={childrenWill} onClick={setWillView} />
    </div>
  );
};

export default MovieCard;
