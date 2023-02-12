import { useState, useEffect } from 'react';
import './index.css';
import MovieCard from '../../components/MovieCard';

const Viewed = () => {
  return (
    <div className="viewed_movie">
      <MovieCard className="viewed_movie" />
    </div>
  );
};

export default Viewed;
