import { useEffect, useState } from 'react';
import getMoviesData from '../../api/getMoviesData';
import Button from '../../components/UI/button/Button';
import Range from '../../components/UI/range/Range';
import { MovieHumorInterface } from '../../types';
import './index.scss';

const Quiz = () => {
  const emotions = {
    '😀': ['комедия', 'мюзикл', 'музыкальный'],
    '😎': ['военные', 'боевики', 'криминал', 'вестерны', 'детективы'],
    '👽': ['фантастика', 'фэнтези', 'приключения'],
    '😊': ['детские', 'мультфильмы', 'семейные'],
    '🧐': ['исторические', 'спортивные', 'документальные', 'биографии'],
    '🥹': ['драмы', 'мелодрамы'],
    '😱': ['ужасы', 'триллеры'],
    '😻': ['аниме'],
  };

  const today = new Date();
  const maxYear = today.getFullYear();
  const minYear = 1920;

  const [rate, setRate] = useState('');
  const [minYearRange, setMinYear] = useState(minYear);
  const [maxYearRange, setMaxYear] = useState(maxYear);

  const rangeMinYear = (value: number) => {
    setMinYear(value);
  };

  const rangeMaxYear = (value: number) => {
    setMaxYear(value);
  };

  // const getMovie = async (e: any) => {
  //   e.preventDefault();
  //   const form = e?.target;
  //   console.log(form);
  //   // const formData = new FormData(form);
  //   // console.log(formData);

  //   // await getMoviesData(
  //   //   {
  //   //     genres: ,
  //   //     year: `${minYearRange}-${maxYearRange}`,
  //   //     rating:
  //   //   },
  //   //   true
  //   // )
  // };

  const [movie, setMovie] = useState({} as MovieHumorInterface);

  const getMovie: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const rating = formData.get('rating') as string;
    console.log(rating, 'rating');
    const showViewed = formData.get('show') as string;
    console.log(showViewed, 'showViewed');
    const genres = (formData.get('emoji') as string).split(',');
    console.log(genres, 'genres');
    const minYearFrom = Number(formData.get('minYear'));
    const maxYearFrom = Number(formData.get('maxYear'));
    const year = `${Math.min(minYearFrom, maxYearFrom)}-${Math.max(minYearFrom, maxYearFrom)}`;
    console.log(year, 'year');

    const response = await getMoviesData({ genres, year, rating }, true);
    console.log(response);
    setMovie(response as MovieHumorInterface);
    const movies = await response;
  };

  return (
    <section className="quiz">
      <h3 className="quiz__title">Фильм по настроению</h3>
      <form className="emotions" onSubmit={getMovie}>
        <span className="emotions__title">Выберите эмоцию</span>
        <div className="emotions__list">
          {Object.entries(emotions).map(([key, value]) => {
            return (
              <label htmlFor={`${key}`} className="emotions__emoji" key={key}>
                {key}
                <input
                  type="radio"
                  name="emoji"
                  id={`${key}`}
                  className="emoji__radio"
                  value={value}
                  required
                />
              </label>
            );
          })}
        </div>
        <span className="emotions__title">Выберите год</span>
        <div className="range-block price-block">
          <div className="range-values">
            <p className="min-range"> {minYear}</p>
            <p className="max-range">{maxYear}</p>
          </div>
          <Range
            value={minYearRange}
            min={minYear}
            max={maxYear}
            step={1}
            onChange={rangeMinYear}
            className="my-range min-range-slidebar"
            name="minYear"
          />
          <Range
            value={maxYearRange}
            min={minYear}
            max={maxYear}
            step={1}
            onChange={rangeMaxYear}
            className="my-range max-range-slidebar"
            name="maxYear"
          />
          <div>
            {' '}
            <strong>Year</strong>
          </div>
        </div>
        <div className="emotions__title">Выберите рейтинг</div>
        <label htmlFor="hight">
          Высокий
          <input type="radio" name="rating" id="hight" value="7-10" />
        </label>
        <label htmlFor="all">
          Неважно
          <input type="radio" name="rating" id="all" value="1-10" defaultChecked />
        </label>
        <div className="emotions__title">Убрать просмотренные и отложенные фильмы?</div>
        <label htmlFor="show">
          Убрать
          <input type="radio" name="show" id="show" value="true" />
        </label>
        <label htmlFor="hidden">
          Оставить
          <input type="radio" name="show" id="hidden" value="false" defaultChecked />
        </label>

        <Button>Отправить</Button>
      </form>
      {movie && <div>{movie.name}</div>}
    </section>
  );
};

export default Quiz;
