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
        <div className="emotions__title">Убрать просмотренные и отложенные фильмы?</div>

        <Button>Отправить</Button>
      </form>
    </section>
  );
};

export default Quiz;
