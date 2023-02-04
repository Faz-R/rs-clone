import getGenresData from '../../api/getGenresData';

export const options = [
  { value: 'titleup', name: 'by title asc' },
  { value: 'titledown', name: 'by title desc' },
  { value: 'priceup', name: 'by price asc' },
  { value: 'pricedown', name: 'by price desc' },
  { value: 'discountPercentageup', name: 'by discountPercentage asc' },
  { value: 'discountPercentagedown', name: 'by discountPercentage desc' },
];

const genresArr = async () => {
  const resp = await getGenresData();
  return resp ? resp?.arrGenres : genres;
};
let raer: string[];
async function r() {
  raer = await genresArr();
}
r();

export default raer;
