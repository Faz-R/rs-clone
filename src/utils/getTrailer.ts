const getTrailer = (trailers?: { url: string }[]) => {
  if (!trailers) return null;

  const result =
    trailers.find((trailer) => trailer.url.startsWith('https://www.youtube.com/'))?.url || null;

  return result;
};

export default getTrailer;
