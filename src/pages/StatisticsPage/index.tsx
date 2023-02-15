import { useSelector, useDispatch } from 'react-redux';
import { selectViewed } from '@store/viewedSlice';
import getStatistics from '@utils/getStatistics';

const StatisticsPage = () => {
  const dispatch = useDispatch();

  const viewed = useSelector(selectViewed);

  //! добавить проверку, если в сторе нет фильмов

  const {
    amountMovies,
    amountTimes,
    favoriteGenres,
    favoriteActors,
    favoriteDirectors,
    genresDiagram,
    viewerMovieLevel,
  } = getStatistics(viewed);

  console.log(genresDiagram);
  console.log(viewerMovieLevel);
  return <h2>StatisticPage</h2>;
};

export default StatisticsPage;
