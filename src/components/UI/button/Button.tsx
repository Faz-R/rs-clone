import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classes from './Button.module.scss';

const Button = ({
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element => {
  return (
    <button type="button" {...props} className={`button ${classes.button}`} aria-hidden="true">
      {children}
    </button>
  );
};

export default Button;
