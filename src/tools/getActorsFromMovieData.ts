import type { PersonType } from '../type';

const getActorsFromMovieData = (persons: PersonType[]) => {
  return persons
    .filter((person) => person.enProfession === 'actor')
    .slice(0, 3)
    .map((person) => person.enName);
};

export default getActorsFromMovieData;
