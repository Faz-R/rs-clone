import { UserDataInterface } from '../type';

const fetchUserData = async (id: number): Promise<UserDataInterface> => {
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  const { username, age, gender } = await response.json();
  return { username, age, gender };
};

export default fetchUserData;
