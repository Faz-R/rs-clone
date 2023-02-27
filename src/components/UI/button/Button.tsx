import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classes from './Button.module.scss';

const Button = ({
  children,
  type,
  onClick,
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element => {
  return (
    <button
      type={type ? 'submit' : 'button'}
      onClick={onClick}
      className={`button ${classes.button}`}
      aria-hidden="true">
      {children}
    </button>
  );
};

export default Button;
