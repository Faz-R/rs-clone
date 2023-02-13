/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import { useAppSelector } from '@store/hooks';
import Button from '@components/UI/button/Button';
import MovieCard from '@components/MovieCard';
import MovieSearchPagination from '@components/Pagination';
import { IIdViewed } from '@store/interfaces';

let asc = true;
let sorted: IIdViewed[];
const moviesPerPage = 5;

const Viewed = () => {
  const viewedArr = useAppSelector((state) => state.viewed.viewed);
  const arrForRateKpAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => {
      if (a.rating.kp && b.rating.kp) return a.rating.kp - b.rating.kp;
      else return 0;
    });
  const arrForRateKpDsc = arrForRateKpAsc.map((item) => item).reverse();
  const arrForRateImdbAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => {
      if (a.rating.imdb && b.rating.imdb) return a.rating.imdb - b.rating.imdb;
      else return 0;
    });

  const arrForRateImdbDsc = arrForRateImdbAsc.map((item) => item).reverse();
  const arrForYearAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => {
      if (a.year && b.year) return a.year - b.year;
      else return 0;
    });
  const arrForYearDsc = arrForYearAsc.map((item) => item).reverse();
  const arrForGenresAsc = viewedArr
    .map((item) => item)
    .sort((a, b) => (a.genres && b.genres && a.genres[0] > b.genres[0] ? 1 : -1));
  const arrForGenresDsc = arrForGenresAsc.map((item) => item).reverse();

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
