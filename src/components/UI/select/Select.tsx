import { useState } from 'react';
import classes from './Select.module.scss';

export interface ISelect {
  options: IOption[];
  defaultValue: string;
  value: string | number;
  onChange: (e: string | number) => void;
}

export interface IOption {
  value: string | number;
  name: string;
  id?: number;
}

export const Select = ({ options, defaultValue, value, onChange }: ISelect) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={classes.select}>
      <option disabled value="" className={classes.option}>
        {defaultValue}
      </option>
      {options.map((option: IOption) => (
        <option key={option.id} value={option.value} className={classes.option}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
