export const getAllGenres = {
  boevik: 'боевик',
  fentezi: 'фэнтези',
  fantastika: 'фантастика',
  triller: 'триллер',
  voennyj: 'военный',
  detektiv: 'детектив',
  komediya: 'комедия',
  drama: 'драма',
  uzhasy: 'ужасы',
  kriminal: 'криминал',
  melodrama: 'мелодрама',
  vestern: 'вестерн',
  biografiya: 'биография',
  anime: 'аниме',
  detskij: 'детский',
  multfilm: 'мультфильм',
  'film-nuar': 'фильм-нуар',
  'dlya-vzroslyh': 'для взрослых',
  dokumentalnyj: 'документальный',
  igra: 'игра',
  istoriya: 'история',
  koncert: 'концерт',
  muzyka: 'музыка',
  myuzikl: 'мюзикл',
  novosti: 'новости',
  priklyucheniya: 'приключения',
  korotkometrazhka: 'короткометражка',
  semejnyj: 'семейный',
  sport: 'спорт',
  'tok-shou': 'ток-шоу',
  ceremoniya: 'церемония',
};

export const minYear = 1900;
export const maxYear = 2023;
export const setYear = 1;
export const minRate = 1;
export const maxRate = 10;
export const setRate = 0.1;

let id = 0;

export const genres = Array.from(Object.values(getAllGenres)).map((i) => {
  id += 1;
  return { name: i, id };
});
