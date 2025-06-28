import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectTheme } from '../theme/theme-selector';
import dropdownLightIcon from '@/assets/images/icon_dropdown-light.svg';
import dropdownIcon from '@/assets/images/icon_dropdown.svg';

/**
 * Компонент навигационного меню с выпадающими списками
 * @component
 * @description Отображает главное меню навигации по сайту с разделами:
 * - Главная страница
 * - Фильмы (с подразделами по жанрам и странам)
 * - Сериалы (с подразделами по жанрам и странам)
 * - Мультфильмы (с подразделами по жанрам и странам)
 * 
 * Меню адаптируется под текущую тему (темную/светлую)
 * @returns {JSX.Element} Возвращает JSX-элемент навигационного меню
 */
export const NavigateList = () => {
  const theme = useSelector(selectTheme);

  return (
    <>
      {/* Выпадающее меню для мобильных устройств */}
      <div className='header__select' role='select'>
        <span className='header__select__name'>
          Menu{' '}
          {/* Иконка стрелки в зависимости от темы */}
          {theme === 'dark' ? (
            <img
              src={dropdownIcon}
              alt='dropdown'
              className='header__select__icon'
            />
          ) : (
            <img
              src={dropdownLightIcon}
              alt='dropdown-light'
              className='header__select__icon'
            />
          )}
        </span>
        {/* Содержимое выпадающего меню */}
        <div className='header__select__dropdown'>
          <Link to='/' className='header__select__link'>
            Home
          </Link>
          <Link to='/type/movie' className='header__select__link'>
            Movies
          </Link>
          <Link to='/type/tv-series' className='header__select__link'>
            Serials
          </Link>
          <Link to='/type/cartoon' className='header__select__link'>
            Cartoons
          </Link>
        </div>
      </div>

      {/* Основное навигационное меню для десктопов */}
      <ul className='header__list' role='list'>
        {/* Пункт меню "Главная" */}
        <li className='header__listItem'>
          <Link to='/' className='header__listItem__link'>
            Home
          </Link>
        </li>
        {/* Пункт меню "Фильмы" с подменю */}
        <li className='header__listItem movies'>
          <Link to='/type/movie' className='header__listItem__link'>
            Movies
          </Link>
          <div className='movies__content'>
            {/* Подраздел жанров фильмов */}
            <div className='genre'>
              <h2 className='movies__content__text'>Genre</h2>
              <Link to='movie?genre=комедия'>Comedy</Link>
              <Link to='movie?genre=драма'>Drama</Link>
              <Link to='movie?genre=фэнтези'> Fantasy</Link>
              <Link to='movie?genre=мелодрама'>Romance</Link>
              <Link to='movie?genre=детектив'>Detective</Link>
              <Link to='movie?genre=боевик'>Action</Link>
              <Link to='movie?genre=триллер'>Thriller</Link>
              <Link to='movie?genre=ужасы'>Horror</Link>
            </div>
            {/* Подраздел стран фильмов */}
            <div className='country'>
              <h2 className='movies__content__text'>Country</h2>
              <Link to='movie?country=США'>USA</Link>
              <Link to='movie?country=Россия'>Russia</Link>
              <Link to='movie?country=Германия'>Germany</Link>
              <Link to='movie?country=Южная Корея'>South Korea</Link>
              <Link to='movie?country=Япония'>Japan</Link>
            </div>
          </div>
        </li>

        {/* Пункт меню "Сериалы" с подменю */}
        <li className='header__listItem serials'>
          <Link to='/type/tv-series' className='header__listItem__link'>
            Serials
          </Link>
          <div className='serials__content'>
            {/* Подраздел жанров сериалов */}
            <div className='genre'>
              <h2 className='serials__content__text'>Genre</h2>
              <Link to='tv-series?genre=комедия'>Comedy</Link>
              <Link to='tv-series?genre=драма'>Drama</Link>
              <Link to='tv-series?genre=детектив'>Detective</Link>
              <Link to='tv-series?genre=триллер'>Thriller</Link>
              <Link to='tv-series?genre=фэнтези'> Fantasy</Link>
            </div>
            {/* Подраздел стран сериалов */}
            <div className='country'>
              <h2 className='serials__content__text'>Country</h2>
              <Link to='tv-series?country=США'>USA</Link>
              <Link to='tv-series?country=Россия'>Russia</Link>
              <Link to='tv-series?country=Германия'>Germany</Link>
              <Link to='tv-series?country=Великобритания'>Great Britain</Link>
              <Link to='tv-series?country=Франция'>France</Link>
            </div>
          </div>
        </li>

        {/* Пункт меню "Мультфильмы" с подменю */}
        <li className='header__listItem cartoons'>
          <Link to='/type/cartoon' className='header__listItem__link'>
            Cartoons
          </Link>
          <div className='cartoons__content'>
            {/* Подраздел жанров мультфильмов */}
            <div className='genre'>
              <h2 className='cartoons__content__text'>Genre</h2>
              <Link to='cartoon?genre=детский'>Child</Link>
              <Link to='cartoon?genre=семейный'>Family</Link>
              <Link to='cartoon?genre=мюзикл'>Musical</Link>
              <Link to='cartoon?genre=ужасы'> Horror</Link>
            </div>
            {/* Подраздел стран мультфильмов */}
            <div className='country'>
              <h2 className='cartoons__content__text'>Country</h2>
              <Link to='cartoon?country=США'>USA</Link>
              <Link to='cartoon?country=Россия'>Russia</Link>
              <Link to='cartoon?country=Япония'>Japan</Link>
              <Link to='cartoon?country=Южная Корея'>South Korea</Link>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};
