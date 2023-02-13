/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import { useAppSelector } from '@store/hooks';
import Button from '@components/UI/button/Button';
import MovieCard from '@components/MovieCard';
import MovieSearchPagination from '@pages/SearhPage/MovieSearchPagination';
import { IIdViewed } from '@store/interfaces';

let asc = true;
let sorted: IIdViewed[];
const moviesPerPage = 5;

const Viewed = () => {
  const viewedArr = useAppSelector((state) => state.viewed.viewed);
  const arrForRateKpAsc = viewedArr.map((item) => item).sort((a, b) => a.rating.kp - b.rating.kp);
  const arrForRateKpDsc = viewedArr.map((item) => item).sort((a, b) => b.rating.kp - a.rating.kp);
  const arrForRateImdbAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => a.rating.imdb - b.rating.imdb);
  const arrForRateImdbDsc = viewedArr
    .map((item) => item)
    .sort((a, b) => b.rating.imdb - a.rating.imdb);
  const arrForYearAsc = viewedArr.map((item) => item).sort((a, b) => a.year - b.year);
  const arrForYearDsc = viewedArr.map((item) => item).sort((a, b) => b.year - a.year);
  const arrForGenresAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => (a.genres[0] > b.genres[0] ? 1 : -1));
  const arrForGenresDsc = viewedArr
    .map((item) => item)
    .sort((a, b) => (b.genres[0] > a.genres[0] ? 1 : -1));

  const [sort, setSort] = useState(arrForRateKpAsc);
  const [state, setState] = useState({
    page: sort.length !== 0 ? 1 : 0,
    pages: Math.ceil(sort.length / 5),
  });

  sorted = sort.slice((state.page - 1) * moviesPerPage, state.page * moviesPerPage);

  const sortByRatingKp = () => {
    if (asc) setSort(arrForRateKpAsc);
    else setSort(arrForRateKpDsc);
    asc = !asc;
  };

  const sortByRatingImdb = () => {
    if (asc) setSort(arrForRateImdbAsc);
    else setSort(arrForRateImdbDsc);
    asc = !asc;
  };

  const sortByYear = () => {
    if (asc) setSort(arrForYearAsc);
    else setSort(arrForYearDsc);
    asc = !asc;
  };

  const sortByGenr = () => {
    if (asc) {
      setSort(arrForGenresAsc);
    } else {
      setSort(arrForGenresDsc);
    }
    asc = !asc;
  };

  const handleBtnClick = (step: 1 | -1) => {
    setState({ ...state, page: state.page + step });
  };

  return (
    <div className="viewed_movie">
      <Button children="по рейтингу кинопоиска" onClick={sortByRatingKp} />
      <Button children="по рейтингу IMDB" onClick={sortByRatingImdb} />
      <Button children="по году" onClick={sortByYear} />
      <Button children="по жанру" onClick={sortByGenr} />
      <MovieSearchPagination
        page={state.page}
        pages={state.pages}
        handleBtnClick={handleBtnClick}
        isMovies={viewedArr.length !== 0}
      />
      {sorted.length !== 0 ? (
        sorted.map((item) => <MovieCard key={item.id} movie={item} id={`${item.id}`} />)
      ) : (
        <h2>вы так ничего и не посмотрели...охохонюшки хохо</h2>
      )}
    </div>
  );
};

export default Viewed;
