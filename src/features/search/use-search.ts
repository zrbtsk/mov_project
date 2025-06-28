import { useSelector } from 'react-redux';
import { loadMoviesBySearch } from '../movies/movies-slice';
import {
  SetStateAction,
  Dispatch,
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';
import { selectTheme } from '../theme/theme-selector';
import { useAppDispatch } from '../../store';

/**
 * Пропсы для хука useSearch
 * @interface useSearchProps
 * @property {string} search - Текущее значение поискового запроса
 * @property {Dispatch<SetStateAction<string>>} setSearch - Функция для обновления поискового запроса
 * @property {Dispatch<SetStateAction<number>>} setPage - Функция для обновления номера страницы
 */
interface useSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

/**
 * Хук для управления поиском фильмов
 * @param {useSearchProps} params - Параметры хука
 * @returns {Object} Объект с функциями обработчиками и текущей темой
 * @property {ChangeEventHandler<HTMLInputElement>} onChangeSearch - Обработчик изменения поля поиска
 * @property {KeyboardEventHandler<HTMLInputElement>} onKeyDownSearch - Обработчик нажатия клавиш в поле поиска
 * @property {MouseEventHandler<HTMLImageElement>} handleSearch - Обработчик клика по кнопке поиска
 * @property {string} theme - Текущая тема приложения
 */
export const useSearch = ({ search, setSearch, setPage }: useSearchProps) => {
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);

  type onSearch = ChangeEventHandler<HTMLInputElement>;
  type onSearchKey = KeyboardEventHandler<HTMLInputElement>;
  type onSearchClick = MouseEventHandler<HTMLImageElement>;

  const onChangeSearch: onSearch = (e) => {
    const newValue = e.target.value;
    if (search !== newValue) {
      setSearch(newValue);
    }
  };

  const onKeyDownSearch: onSearchKey = (e) => {
    if (e.key === 'Enter') {
      setPage(1);
      dispatch(loadMoviesBySearch({ search, page: 1 }));
    }
  };

  const handleSearch: onSearchClick = () => {
    setPage(1);
    dispatch(loadMoviesBySearch({ search, page: 1 }));
  };
  return { onChangeSearch, onKeyDownSearch, handleSearch, theme };
};
