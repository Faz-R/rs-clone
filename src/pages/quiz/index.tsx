import Button from '../../components/UI/button/Button';
import './index.scss';

const Quiz = () => {
  const emotions = {
    '😀': ['комедия', 'мюзикл', 'музыкальный'],
    '😎': ['военные', 'боевики', 'криминал', 'вестерны', 'детективы'],
    '👽': ['фантастика', 'фэнтези', 'приключения'],
    '😊': ['детские', 'мультфильмы', 'семейные'],
    '🧐': ['исторические', 'спортивные', 'документальные', 'биографии'],
    '🥹': ['драмы', 'мелодрамы'],
    '😯': ['ужасы', 'триллеры'],
    '👻': ['аниме'],
  };

  return (
    <section className="quiz">
      <form className="emotions">
        <div className="emotions__title">Выберите эмоцию</div>
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
                />
              </label>
            );
          })}
        </div>
        <div className="emotions__title">Выберите год</div>
        <div className="emotions__title">Выберите рейтинг</div>
        <label htmlFor="hight">
          Высокий
          <input type="radio" name="rating" id="hight" value="7-10" />
        </label>
        <label htmlFor="all">
          Неважно
          <input type="radio" name="rating" id="all" value="" />
        </label>
        <div className="emotions__title">Убрать просмотренные и отложенные фильмы?</div>
        <label htmlFor="show">
          Убрать
          <input type="radio" name="show" id="show" value="true" />
        </label>
        <label htmlFor="hidden">
          Оставить
          <input type="radio" name="show" id="hidden" value="false" />
        </label>

        <Button>Отправить</Button>
      </form>
    </section>
  );
};

export default Quiz;
