import { Link } from 'react-router-dom';
import Button from '@components/UI/button/Button';
import './index.scss';

const MainPage = () => {
  return (
    <section className="main-page">
      <div className="main-page__question">
        <h2 className="page__title">
          <i className="fa-solid fa-angles-right design__row" /> Что сегодня посмотреть?
        </h2>
        <div className="question__cards">
          <div className="question-card__wrapper">
            <div className="question__cards__card">
              <div className="card__front">
                <div className="card__circle">
                  <span className="fa-regular fa-face-smile-wink" />
                </div>
                <h5 className="card__front__text">Фильм под настроение</h5>
              </div>
              <div className="card__back">
                <h5 className="card__back__title-text">Фильм под настроение</h5>
                <span className="card__back__text">
                  С помощью анкеты поможем выбрать фильм, который вам обязательно подойдёт
                </span>
                <Link to="humor" className="card__link">
                  посмотреть
                </Link>
              </div>
            </div>
          </div>
          <div className="question-card__wrapper">
            <div className="question__cards__card">
              <div className="card__front">
                <div className="card__circle">
                  <span className="fa-solid fa-shuffle" />
                </div>
                <h5 className="card__front__text">Случайный фильм</h5>
              </div>
              <div className="card__back">
                <h5 className="card__back__title-text">Случайный фильм</h5>
                <span className="card__back__text">
                  Положиться на удачу, и пусть она подскажет, какой фильм будем смотреть
                </span>
                <Link to="random" className="card__link">
                  посмотреть
                </Link>
              </div>
            </div>
          </div>
          <div className="question-card__wrapper">
            <div className="question__cards__card">
              <div className="card__front">
                <div className="card__circle">
                  <i className="fa-regular fa-clock" />
                </div>
                <h5 className="card__front__text">Отложенные фильмы</h5>
              </div>
              <div className="card__back">
                <h5 className="card__back__title-text">Отложенные фильмы</h5>
                <span className="card__back__text">
                  Список фильмов, ранее запланированных для просмотра
                </span>
                <Link to="expect" className="card__link">
                  посмотреть
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-page__user">
        <h2 className="page__title">
          <i className="fa-solid fa-angles-right design__row" /> Информация о пользователе
        </h2>
        <div className="user__info">
          <div className="user__logo fa-solid fa-user" />
          <div className="user__description">
            <Link to="viewed" className="user__text">
              <i className="fa-solid fa-plus text__plus" /> Просмотренные фильмы
            </Link>
            <Link to="statistics" className="user__text">
              <i className="fa-solid fa-plus text__plus" /> Статистика
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
