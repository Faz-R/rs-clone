/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classes from './Button.module.scss';

const Button = ({
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element => {
  return (
    <button {...props} className={`button ${classes.button}`}>
      {children}
    </button>
  );
};

export default Button;
