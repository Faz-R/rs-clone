/* eslint-disable react/no-children-prop */
import './index.css';
import { IIdViewed } from '@store/interfaces';

interface IMovieCardProps {
  id: string;
  movie: IIdViewed;
}

const MovieCard = ({ id, movie }: IMovieCardProps) => {
  return (
    <div id={id} className="movie_viewed_card">
      <img
        src={movie.poster || 'https://pchelp24.com/wp-content/uploads/images/05(1).png'}
        alt="нет картинки"
        className="img_movie_card"
      />
      <h2 className="viewed_movie_name">{`${movie.name}    ${movie.year}`}</h2>
      <div className="viewed_movie_descr">{movie.description}</div>
      <h4 className="viewed_movie_genres">{movie.genres?.join(',   ')}</h4>
      <h3 className="viewed_movie_country">{movie.countries?.join(',   ')}</h3>
      <h3 className="viewed_movie_rating">
        {`рейтинг КП  ${movie.rating.kp}   рейтинг IMDB  ${movie.rating.imdb}`}
      </h3>
    </div>
  );
};

export default MovieCard;
