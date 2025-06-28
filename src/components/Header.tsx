import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../features/theme/Theme';
import { NavigateList } from '../features/navigate/NavigateList';
import { clearMovies } from '../features/movies/movies-slice';
import { selectTheme } from '../features/theme/theme-selector';
import { selectAutorization } from '../features/autorization/autorization-select';

import logoDark from '@/assets/images/logo.png';
import logoLight from '@/assets/images/logo-light.jpeg';
import searchIcon from '@/assets/images/icon_search.png';
import searchLightIcon from '@/assets/images/icon_search-light.svg';
import autorozIcon from '@/assets/images/icon_autoriz.svg';
import autorizLightIcon from '@/assets/images/icon_autoriz-light.svg';
import userIcon from '@/assets/images/icon_user.png';
import userLightIcon from '@/assets/images/icon_user-light.svg';
/**
 * Компонент шапки сайта с навигацией и элементами управления
 * @component
 * @returns {JSX.Element} Возвращает шапку сайта
 * @description
 * Компонент шапки с особенностями:
 * - Адаптивный логотип под текущую тему
 * - Навигационное меню
 * - Кнопка поиска
 * - Переключатель темы
 * - Кнопка входа/профиля в зависимости от статуса авторизации
 */
export const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const autorization = useSelector(selectAutorization);

  return (
    <nav className='header'>
      {/* Логотип с очисткой фильмов при клике */}
      <Link to='/'>
        <img
          src={theme === 'dark' ? logoDark : logoLight}
          alt='Site logo'
          width={theme === 'dark' ? '80px' : '80px'}
          height={theme === 'dark' ? '35px' : '32px'}
          className='header__logo'
          onClick={() => dispatch(clearMovies())}
        />
      </Link>
      {/* Навигационное меню */}
      <NavigateList />

      {/* Кнопка поиска */}
      <Link className='header__search' to='/search'>
        <p className='header__search__text'>Search</p>
        <img
          src={theme === 'dark' ? searchIcon : searchLightIcon}
          alt='Search icon'
          width={theme === 'dark' ? '16px' : '18px'}
          height={theme === 'dark' ? '16px' : '18px'}
          className='header__search__btn'
        />
      </Link>
      {/* Переключатель темы */}
      <Theme />

      {/* Блок авторизации/профиля */}
      {autorization === true ? (
        <Link to='/favourite'>
          <img
            src={theme === 'dark' ? autorozIcon : autorizLightIcon}
            alt='User profile'
            width='28px'
          />
        </Link>
      ) : (
        <Link to='/autorization'>
          <div className='header__login'>
            <img
              src={theme === 'dark' ? userIcon : userLightIcon}
              alt='Login icon'
              width='16px'
              height='16px'
              className='header__login__user'
            />
            <p className='header__login__text'>Log in</p>
          </div>
        </Link>
      )}
    </nav>
  );
};
