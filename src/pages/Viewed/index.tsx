import { useState, useEffect } from 'react';
import './index.css';
import MovieCard from '../../components/MovieCard';
//let expanded = false;

const Viewed = () => {
  /* const [minYearRange, setMinYear] = useState(minYear);
 
  useEffect(() => {
    if (genres) {
      setGenresState(genres);
    }
  }, [cardOfMovie]);

  const checkboxes = document.getElementById('checkboxes');

  const showCheckboxes = function a() {
    if (checkboxes) {
      if (!expanded) {
        checkboxes.style.display = 'block';
        expanded = true;
      } else {
        checkboxes.style.display = 'none';
        expanded = false;
      }
    }
  }; 

  

  
  const rangeMaxRate = (value: number) => {
    setMaxRate(value);
  };
*/
 

  return (
    <div className="viewed_movie">
      <MovieCard className='viewed_movie'/>
      
      
    </div>
  );
};

export default Viewed;
