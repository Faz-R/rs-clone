/* eslint-disable react/no-children-prop */
import './index.css';
import Button from '../UI/button/Button';
import { useViewedDispatch, useViewedSelector } from '../../store/viewed/hooks';
import { addIdToViewed, removeIdFromViewed } from '../../store/viewed/viewedSlice';
import { MovieHumorInterface } from '../../types';

interface IMovieCardProps {
  id: string;
  className: string;
  poster: string;
  movie: MovieHumorInterface;
}

const MovieCard = ({ id, poster, className = '', movie }: IMovieCardProps) => {
  const dispatch = useViewedDispatch();
  const idArr = useViewedSelector((state) => state.viewed);
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
