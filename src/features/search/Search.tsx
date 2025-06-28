import { SetStateAction, Dispatch } from 'react';

import { useSearch } from './use-search';
import searchLightIcon from '@/assets/images/icon_search-light.svg';
import searchIcon from '@/assets/images/icon_search.png';

/**
 * Свойства компонента Search
 * @interface SearchProps
 * @property {string} search - Текущее значение поискового запроса
 * @property {Dispatch<SetStateAction<string>>} setSearch - Функция для обновления поискового запроса
 * @property {Dispatch<SetStateAction<number>>} setPage - Функция для обновления номера страницы
 */
interface SearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

/**
 * Компонент поиска фильмов
 * @component
 * @param {SearchProps} props - Свойства компонента
 * @returns {JSX.Element} Возвращает JSX-элемент формы поиска
 */
export const Search = ({ search, setSearch, setPage }: SearchProps) => {
  // Используем хук useSearch для получения обработчиков и текущей темы
  const { onChangeSearch, onKeyDownSearch, handleSearch, theme } = useSearch({
    search,
    setSearch,
    setPage,
  });

  return (
    <div className='search'>
      {/* Поле ввода поискового запроса */}
      <input
        type='search'
        placeholder='Search...'
        className='search__input'
        onChange={onChangeSearch}
        onKeyDown={onKeyDownSearch}
      />
      {/* Кнопка поиска с изменяемой иконкой в зависимости от темы */}
      {theme === 'dark' ? (
        <img
          src={searchIcon}
          alt='search'
          width='16px'
          height='16px'
          className='search__btn'
          onClick={handleSearch}
        />
      ) : (
        <img
          src={searchLightIcon}
          alt='search'
          width='16px'
          height='16px'
          className='search__btn'
          onClick={handleSearch}
        />
      )}
    </div>
  );
};
