/* eslint-disable react/no-children-prop */
import './index.css';
import Button from '../UI/button/Button';
import { addIdToViewed, removeIdFromViewed } from '../../store/viewedSlice';
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
  const children = !idArr.find((item) => movie.id === item.id)
    ? 'в просмотренные'
    : 'из просмотренных';

  const setWillView = () => {
    console.log('буду смотреть', idArr);
  };
  const setViewed = () => {
    if (!idArr.find((item) => movie.id === item.id)) {
      dispatch(
        addIdToViewed({
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
      dispatch(removeIdFromViewed(movie.id));
    }
  };

  return (
    <div id={id} className={className}>
      <img src={poster} alt="нет картинки" className={`img_movie_card ${className}`} />
      <Button children={children} onClick={setViewed} />
      <Button children="буду смотреть" onClick={setWillView} />
    </div>
  );
};

export default MovieCard;
