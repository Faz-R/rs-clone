import { useSelector, useDispatch } from 'react-redux';
import { selectViewed } from '@store/viewedSlice';
import getStatistics from '@utils/getStatistics';

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const viewed = useSelector(selectViewed);
  const { amountMovies, amountTimes, favoriteGenres, favoriteActors, favoriteDirectors } =
    getStatistics(viewed);
  console.log(amountMovies);
  console.log(amountTimes);
  console.log(favoriteGenres);
  console.log(favoriteActors);
  console.log(favoriteDirectors);
  return <h2>StatisticPage</h2>;
};

export default StatisticsPage;
