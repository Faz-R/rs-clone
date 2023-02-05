import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [searchState, setSearchState] = useState('');
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    navigate('/search', { state: form.s.value });
  };

  return (
    <form role="search" className="search-form" onSubmit={handleSubmit}>
      <input
        required
        type="text"
        id="search-form-63ce639e4857b"
        className="search-field"
        placeholder="Поиск…"
        value={searchState}
        name="s"
        onChange={(e) => {
          setSearchState(e.target.value);
        }}
      />
      <button className="search-button fa-solid fa-magnifying-glass" type="submit" value="Search" />
    </form>
  );
};

export default SearchForm;
