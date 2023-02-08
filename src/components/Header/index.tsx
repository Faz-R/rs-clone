import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import './index.scss';

const Header = () => {
  const [modalSearch, setModalSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('theme', 'light-theme');
    } else {
      document.documentElement.setAttribute('theme', 'dark-theme');
    }

    if (showMenu) {
      setModalSearch(false);
    }
  }, [theme, showMenu]);

  const closeNav = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className={`dark ${showMenu ? 'show' : ''}`} onClick={closeNav} aria-hidden="true" />
      <div className={`navigation ${showMenu ? 'navigation__active' : ''}`}>
        <Link to="/" onClick={closeNav}>
          <svg
            xmlSpace="preserve"
            id="OBJECTS"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 412 271"
            width={100}
            className="header__logo__img nav__logo">
            <path
              d="m9 230 10 30 11-30h8l-15 40h-7L0 230h9zM54 270v-40h8v40h-8zM110 263v7H82v-40h27v7H89v10h17v6H89v10h21zM141 230h7l5 13 4-13h7l-6 18 5 13 11-31h9l-17 40h-7l-6-17-7 17h-7l-16-40h8l12 31 5-13-7-18zM198 270v-40h17l5 1a14 14 0 0 1 7 8l1 4a14 14 0 0 1-4 10 12 12 0 0 1-9 4h-9v13h-8zm8-20h9l4-2 1-5a8 8 0 0 0-2-5l-1-1h-11v13zM262 271a19 19 0 0 1-18-13l-2-8 2-8 4-6a19 19 0 0 1 14-6c3 0 6 0 8 2a20 20 0 0 1 10 11l2 7-2 8a21 21 0 0 1-10 11l-8 2zm-12-21 1 5 2 4 4 3 5 1c2 1 4 0 5-1 2 0 3-1 4-3l2-4a16 16 0 0 0 0-10l-2-4-4-3a11 11 0 0 0-10 0l-4 3-2 4-1 5zM299 270v-40h8v40h-8zM334 244v26h-8v-40h6l22 26v-26h7v40h-6l-21-26zM411 237h-13v33h-8v-33h-12v-7h33v7zM207 180c-12 0-23-2-34-8a83 83 0 1 1 34 8zm0-152a69 69 0 1 0 0 138 69 69 0 0 0 0-138z"
              fill="var(--secondary-color)"
            />
            <path
              d="M150 69a64 64 0 0 0 2 60l45-52-47-8zM204 33c-22 1-42 14-52 33l68 12-16-45zM265 126a64 64 0 0 0-2-61l-45 53 47 8zM261 63a63 63 0 0 0-54-30l23 66 31-36zM154 132a64 64 0 0 0 55 29l-25-65-30 36zM212 161c21-1 41-14 51-33l-68-12 17 45z"
              fill="var(--secondary-color)"
              className="eye-color"
            />
            <path
              fill="var(--secondary-color)"
              stroke="var(--secondary-color)"
              strokeMiterlimit="10"
              d="M381 97C200-109 44 84 34 97h-1l1 1h-1 1c180 206 337 13 347 0v-1zm-20 1h-1c-9 12-147 181-306 0v-1c10-11 147-181 306 0h1v1z"
            />
          </svg>
        </Link>
        <ul className="nav__list">
          <li>
            <Link to="humor" className="nav__link" onClick={closeNav}>
              Фильм под настроение
            </Link>
          </li>
          <li>
            <Link to="random" className="nav__link" onClick={closeNav}>
              Случайный фильм
            </Link>
          </li>
          <li>
            <Link to="viewed" className="nav__link" onClick={closeNav}>
              Просмотренные
            </Link>
          </li>
          <li>
            <Link to="expect" className="nav__link" onClick={closeNav}>
              Буду смотреть
            </Link>
          </li>
          <li>
            <Link to="statistics" className="nav__link" onClick={closeNav}>
              Статистика
            </Link>
          </li>
        </ul>
      </div>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link to="/" className="header__logo">
              <svg
                xmlSpace="preserve"
                id="OBJECTS"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 412 271"
                width={100}
                className="header__logo__img">
                <path d="m9 230 10 30 11-30h8l-15 40h-7L0 230h9zM54 270v-40h8v40h-8zM110 263v7H82v-40h27v7H89v10h17v6H89v10h21zM141 230h7l5 13 4-13h7l-6 18 5 13 11-31h9l-17 40h-7l-6-17-7 17h-7l-16-40h8l12 31 5-13-7-18zM198 270v-40h17l5 1a14 14 0 0 1 7 8l1 4a14 14 0 0 1-4 10 12 12 0 0 1-9 4h-9v13h-8zm8-20h9l4-2 1-5a8 8 0 0 0-2-5l-1-1h-11v13zM262 271a19 19 0 0 1-18-13l-2-8 2-8 4-6a19 19 0 0 1 14-6c3 0 6 0 8 2a20 20 0 0 1 10 11l2 7-2 8a21 21 0 0 1-10 11l-8 2zm-12-21 1 5 2 4 4 3 5 1c2 1 4 0 5-1 2 0 3-1 4-3l2-4a16 16 0 0 0 0-10l-2-4-4-3a11 11 0 0 0-10 0l-4 3-2 4-1 5zM299 270v-40h8v40h-8zM334 244v26h-8v-40h6l22 26v-26h7v40h-6l-21-26zM411 237h-13v33h-8v-33h-12v-7h33v7zM207 180c-12 0-23-2-34-8a83 83 0 1 1 34 8zm0-152a69 69 0 1 0 0 138 69 69 0 0 0 0-138z" />
                <path
                  d="M150 69a64 64 0 0 0 2 60l45-52-47-8zM204 33c-22 1-42 14-52 33l68 12-16-45zM265 126a64 64 0 0 0-2-61l-45 53 47 8zM261 63a63 63 0 0 0-54-30l23 66 31-36zM154 132a64 64 0 0 0 55 29l-25-65-30 36zM212 161c21-1 41-14 51-33l-68-12 17 45z"
                  className="eye-color"
                />
                <path
                  stroke="#fff"
                  strokeMiterlimit="10"
                  d="M381 97C200-109 44 84 34 97h-1l1 1h-1 1c180 206 337 13 347 0v-1zm-20 1h-1c-9 12-147 181-306 0v-1c10-11 147-181 306 0h1v1z"
                />
              </svg>
            </Link>

            <div className="header__buttons">
              <div className="search-block">
                <div
                  className="header__icon"
                  onClick={() => {
                    setModalSearch(!modalSearch);
                  }}
                  aria-hidden="true">
                  <i
                    className={`fa-solid fa-magnifying-glass header__show-button ${
                      !modalSearch && `header__show-button__active`
                    }`}
                  />

                  <i
                    className={`fa-solid fa-xmark header__show-button ${
                      modalSearch && `header__show-button__active`
                    }`}
                  />
                </div>
                <div className={`search-wrapper ${modalSearch ? 'show' : ''}`}>
                  <SearchForm />
                </div>
              </div>
              <div
                className="change-theme_button header__icon"
                onClick={() => {
                  setTheme(!theme);
                }}
                aria-hidden="true">
                <i
                  className={`fa-regular fa-moon header__show-button ${
                    theme && `header__show-button__active`
                  }`}
                />

                <i
                  className={`fa-solid fa-sun header__show-button ${
                    !theme && `header__show-button__active`
                  }`}
                />
              </div>
              <div
                className="burger-menu_button header__icon"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
                aria-hidden="true">
                <i
                  className={`fa-solid fa-bars header__show-button ${
                    !showMenu && `header__show-button__active`
                  }`}
                />

                <i
                  className={`fa-solid fa-xmark header__show-button ${
                    showMenu && `header__show-button__active`
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
