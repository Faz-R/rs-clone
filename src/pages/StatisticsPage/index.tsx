import { useSelector, useDispatch } from 'react-redux';
import { selectViewed } from '@store/viewedSlice';
import getStatistics from '@utils/getStatistics';
import './index.scss';
import Diagram from '@components/UI/Diagram/Diagram';
import { useEffect, useState } from 'react';
import Bars from '@components/UI/Bars/Bars';
import { useSearchParams } from 'react-router-dom';

const StatisticsPage = () => {
  const dispatch = useDispatch();

  const lightFont = '#ffffff';
  const darkFont = '#181818';

  const viewed = useSelector(selectViewed);
  const [sizeChartFont, setSizeChartFont] = useState(16);
  const [chartFontColor, setChartFontColor] = useState(darkFont);

  const [searchParams, setSearchParams] = useSearchParams();
  const themeExist = searchParams.get('theme');

  const {
    amountMovies,
    amountTimes,
    favoriteGenres,
    favoriteActors,
    favoriteDirectors,
    genresDiagram,
    viewerMovieLevel,
  } = getStatistics(viewed);

  const getTimes = (time: number) => {
    const minutes = time % 60;
    const hours = Math.floor((time / 60) % 24);
    const days = Math.floor(time / 60 / 24);
    return `${days ? `${days}д.` : ''}${hours ? ` ${hours}ч.` : ''}${minutes && ` ${minutes}м.`}`;
  };

  const dataGenres = Object.entries(genresDiagram).sort(
    ([value1, key1], [value2, key2]) => Number(key1) - Number(key2)
  );

  const namesGenres = dataGenres.map(([key, value]) => key);
  const percentsGenres: number[] = dataGenres.map(([key, value]) => Number(value));

  useEffect(() => {
    if (window.innerWidth <= 450) {
      setSizeChartFont(12);
    }

    if (themeExist === 'light') {
      setChartFontColor(darkFont);
    }
    if (themeExist === 'dark') {
      setChartFontColor(lightFont);
    }
  }, [chartFontColor, themeExist]);

  return (
    <section className="statistic-page">
      <div className="statistic__title">
        <i className="fa-solid fa-angles-right statistic__design__row" /> Статистика
      </div>
      {viewed.length === 0 ? (
        <div className="statistic__empty">Фильмов пока нет</div>
      ) : (
        <>
          <div className="statistic__top">
            <div className="statistic__numbers-block statistics__block">
              <div className="statistic__number">{amountMovies}</div>
              <div className="statistic__number-subtitle">просмотренных фильмов</div>
            </div>
            <div className="statistic__numbers-block statistics__block">
              <div className="statistic__number">{getTimes(amountTimes)}</div>
              <div className="statistic__number-subtitle">проведено за просмотром</div>
            </div>
            <div className="statistic__numbers-block statistics__block">
              <div className="statistic__number">{viewerMovieLevel}</div>
            </div>
          </div>
          <div className="statistic__middle">
            <div className="statistic__diagram statistics__block">
              <span className="statistic__subtitle">Предпочтения в жанрах</span>
              <div className="statistic__middle__diagram">
                <Diagram labels={namesGenres.reverse()} data={percentsGenres.reverse()} />
              </div>
            </div>
            <div className="statistic__genres-bar statistics__block">
              <span className="statistic__subtitle">Топ-5 жанров</span>
              <div className="statistic__middle__bar">
                <Bars
                  labels={Object.keys(favoriteGenres)}
                  data={Object.values(favoriteGenres) as number[]}
                  size={sizeChartFont}
                  color={chartFontColor}
                  direction="x"
                />
              </div>
            </div>
          </div>
          <div className="statistic__footer">
            <div className="statistic__actor-bar statistics__block">
              <span className="statistic__subtitle">Топ-5 актёров</span>
              <div className="statistic__footer__bar">
                <Bars
                  labels={Object.keys(favoriteActors)}
                  data={Object.values(favoriteActors) as number[]}
                  size={sizeChartFont}
                  color={chartFontColor}
                  direction="y"
                />
              </div>
            </div>
            <div className="statistic__director-bar statistics__block">
              <span className="statistic__subtitle">Топ-5 режиссёров</span>
              <div className="statistic__footer__bar">
                <Bars
                  labels={Object.keys(favoriteDirectors)}
                  data={Object.values(favoriteDirectors) as number[]}
                  size={sizeChartFont}
                  color={chartFontColor}
                  direction="y"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default StatisticsPage;
