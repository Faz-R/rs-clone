import classes from './index.module.scss';

const MovieSearchPagination = (props: {
  page: number;
  pages: number;
  isMovies: boolean;
  handleBtnClick: (step: -1 | 1) => void;
}) => {
  const { page, pages, handleBtnClick, isMovies } = props;
  return isMovies ? (
    <div className={`pagination ${classes.pagination}`}>
      <button
        type="button"
        className={`fa-solid fa-angle-left  ${classes.button}`}
        disabled={page === 1}
        onClick={() => handleBtnClick(-1)}
      />
      <span className={classes.number}>
        {page} / {pages}
      </span>
      <button
        type="button"
        className={`fa-solid fa-angle-right  ${classes.button}`}
        disabled={page === pages}
        onClick={() => handleBtnClick(1)}
      />
    </div>
  ) : null;
};

export default MovieSearchPagination;
