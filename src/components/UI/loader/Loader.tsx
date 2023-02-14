import classes from './Loader.module.scss';

interface ILoader {
  className: string;
  loading: boolean;
}

const Loader = ({ loading, className }: ILoader) => {
  return (
    <svg
      xmlSpace="preserve"
      id="OBJECTS"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 284 284"
      className={`${className} ${classes.loader}`}>
      <path
        d="m244 78-69 69V27c29 8 53 26 69 51zm3 6-85 85h97a123 123 0 0 0-12-85zm-42 160c25-15 44-40 53-69H137l68 69zM25 116a123 123 0 0 0 12 85l85-85H25zm53-76c-24 16-43 40-51 69h120L78 40zm38 219a123 123 0 0 0 83-11l-84-86v97zm-7-1V138l-68 68c15 25 40 44 68 52zm60-233a123 123 0 0 0-85 12l85 85V25z"
        className={loading ? `${classes.animation}` : ''}
      />
      <path d="M273 87a144 144 0 0 0-76-76A141 141 0 0 0 11 87a141 141 0 0 0 76 186 141 141 0 0 0 186-76 141 141 0 0 0 0-110zM142 271a129 129 0 1 1 0-258 129 129 0 0 1 0 258z" />
    </svg>
  );
};

export default Loader;
