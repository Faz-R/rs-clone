import Button from '../../components/UI/button/Button';
import './index.scss';

const MainPage = () => {
  return (
    <section className="main-page">
      <div className="main-page__question">
        <div className="question__title">Что сегодня посмотреть?</div>
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
                <Button>посмотреть</Button>
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
                  Положиться на удачу и пусть она подскажет, какой фильм будем смотреть
                </span>
                <Button>посмотреть</Button>
              </div>
            </div>
          </div>
          <div className="question-card__wrapper">
            <div className="question__cards__card">
              <div className="card__front">
                <div className="card__circle">
                  <i className="fa-regular fa-clock" />
                </div>
                <h5 className="card__front__text">Запланированные</h5>
              </div>
              <div className="card__back">
                <h5 className="card__back__title-text">Запланированные</h5>
                <span className="card__back__text">
                  Список фильмов, ранее отложенных для просмотра
                </span>
                <Button>посмотреть</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-page__user">
        <div className="user__title">Информация о пользователе</div>
        <div className="user__info">
          <div className="user__logo fa-solid fa-user" />
          <div className="user__description">
            <span className="user__text">
              <i className="fa-solid fa-plus text__plus" /> Просмотренные фильмы
            </span>
            <span className="user__text">
              <i className="fa-solid fa-plus text__plus" /> Статистика
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
