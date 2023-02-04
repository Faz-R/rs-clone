import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserData, selectUser, changeUserName } from '../../store/userSlice';
import getMoviesData from '../../api/getMoviesData';

const User = () => {
  const store = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { data, status } = store;

  return status === 'idle' ? (
    <section>
      <h2>{data.username}</h2>
      <p>
        <span>{data.age}</span>
        <span>{data.gender}</span>
      </p>
      <button type="button" onClick={() => dispatch(changeUserName('New Name'))}>
        change name
      </button>
      <button type="button" onClick={() => dispatch(getUserData(1))}>
        get next user
      </button>
      <button
        type="button"
        onClick={() =>
          getMoviesData({ year: 2022, rating: '7-10', genres: ['ужасы', 'триллеры'] }, true)
        }>
        request test
      </button>
    </section>
  ) : (
    <h2>Loading...</h2>
  );
};

export default User;
