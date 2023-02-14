import Button from '@components/UI/button/Button';
import { Link, useRouteError } from 'react-router-dom';
import classes from './index.module.scss';

const Error = () => {
  const error = useRouteError() as Response;
  return (
    <div className={classes.error__wrapper}>
      <div className={classes.error_page__subtitle}>
        {error?.statusText ? `Ошибочка вышла!` : ''}
      </div>
      <div className={classes.error}>{error?.status ?? ''}</div>
      <div className={classes.error_page__title}>{error?.statusText ?? 'Что-то пошло не так'}</div>
      <Link to="/">
        <Button>Вернуться на главную</Button>
      </Link>
    </div>
  );
};

export default Error;
