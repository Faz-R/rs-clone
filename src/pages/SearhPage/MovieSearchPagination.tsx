const MovieSearchPagination = (props: {
  page: number;
  pages: number;
  isMovies: boolean;
  handleBtnClick: (step: -1 | 1) => void;
}) => {
  const { page, pages, handleBtnClick, isMovies } = props;
  return isMovies ? (
    <div>
      <button type="button" disabled={page === 1} onClick={() => handleBtnClick(-1)}>
        prev
      </button>
      <span>
        current: {page} / total: {pages}
      </span>
      <button type="button" disabled={page === pages} onClick={() => handleBtnClick(1)}>
        next
      </button>
    </div>
  ) : null;
};

export default MovieSearchPagination;
