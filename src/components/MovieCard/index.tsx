/* eslint-disable react/no-children-prop */
import './index.css';
import Button from '../UI/button/Button';
import { useViewedDispatch } from '../../store/viewed/hooks';
import { addIdToViewed } from '../../store/viewed/viewedSlice';

interface IMovieCardProps {
  id: string;
  className: string;
}


const MovieCard = ({ id = '1046206', className }: IMovieCardProps) => {
  const dispatch = useViewedDispatch();

  const setWillView = () => {
    console.log('буду смотреть');
    dispatch(addIdToViewed(id));
  };
  const setViewed = () => {
    console.log('посмотрел');
  };

  return (
    <div id={id} className={className}>
      <img
        src="https://st.kp.yandex.net/images/film_big/1046206.jpg"
        alt="нет картинки"
        className="img_movie_card"
      />
      <Button children="в просмотренные" onClick={setViewed} />
      <Button children="буду смотреть" onClick={setWillView} />
    </div>
  );
};

export default MovieCard;
