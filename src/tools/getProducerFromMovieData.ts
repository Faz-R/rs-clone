import type { PersonType } from '../type';

const getProducerFromMovieData = (persons: PersonType[]) => {
  return persons.find((person) => person.enProfession === 'director')?.enName ?? '';
};

export default getProducerFromMovieData;
