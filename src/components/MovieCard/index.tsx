/* eslint-disable react/no-children-prop */
import './index.css';
import Button from '../UI/button/Button';

interface IMovieCardProps {
  id: string;
  className: string;
}

const setWillView = () => {console.log("буду смотреть")}
const setViewed = () => {console.log("посмотрел")}

const MovieCard = ({ id = '1046206', className }: IMovieCardProps) => {
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
