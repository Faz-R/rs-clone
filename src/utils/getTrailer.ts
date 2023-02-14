import getRandomNumber from './getRandomNumber';

const getTrailer = (trailers?: { url: string }[]) => {
  if (!trailers) return null;
  const result =
    trailers.find((trailer) => trailer.url.startsWith('https://widgets.kinopoisk.ru/'))?.url ??
    trailers[getRandomNumber(trailers.length)]?.url;

  return result;
};

export default getTrailer;
