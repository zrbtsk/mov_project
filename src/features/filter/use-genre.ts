import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setGenre } from './filter-slice';
import { useAppDispatch } from '../../store';
import { Genre, OptionSelectGenre } from '../../types';
import { MultiValue } from 'react-select';
import { selectFilter } from './filter-selector';

/**
 * Хук для управления выбором жанров в фильтрах
 * @param {URLSearchParams} searchParams - Параметры URL для извлечения начального значения жанра
 * @returns {Object} Объект с данными и методами для работы с выбором жанров
 * @property {OptionSelectGenre[]} optionsG - Массив вариантов жанров для выбора
 * @property {Function} handleSelectGenre - Обработчик выбора жанров
 * @property {OptionSelectGenre[]} reduxGenre - Текущие выбранные жанры из Redux store
 */
export const useGenre = (searchParams: URLSearchParams) => {
  const dispatch = useAppDispatch();
  const genreString = searchParams.get('genre');
  const { type } = useParams();

  /**
 * Тип для объекта с вариантами жанров
 * @typedef {Object} GenreOptions
 * @property {Object} [key: string] - Объект с данными жанра
 * @property {Genre} value - Значение жанра для Redux
 * @property {string} label - Отображаемое название жанра
 */
  type GenreOptions = {
    [GenreKey: string]: { value: Genre; label: string };
  };

  // Основные жанры для фильмов и сериалов
  const optionsGenre: GenreOptions = {
    боевик: { value: 'боевик', label: 'Action' },
    приключения: { value: 'приключения', label: 'Adventure' },
    мультфильм: { value: 'мультфильм', label: 'Animation' },
    биография: { value: 'биография', label: 'Biography' },
    комедия: { value: 'комедия', label: 'Comedy' },
    криминал: { value: 'криминал', label: 'Crime' },
    драма: { value: 'драма', label: 'Drama' },
    документальный: { value: 'документальный', label: 'Documentary' },
    семейный: { value: 'семейный', label: 'Family' },
    фэнтези: { value: 'фэнтези', label: 'Fantasy' },
    исторический: { value: 'исторический', label: 'History' },
    ужасы: { value: 'ужасы', label: 'Horror' },
    музыка: { value: 'музыка', label: 'Music' },
    мюзикл: { value: 'мюзикл', label: 'Musical' },
    мелодрама: { value: 'мелодрама', label: 'Romance' },
    научный: { value: 'научный', label: 'Sci-Fi' },
    спорт: { value: 'спорт', label: 'Sport' },
    триллер: { value: 'триллер', label: 'Thriller' },
    военный: { value: 'военный', label: 'War' },
    вестерн: { value: 'вестерн', label: 'Western' },
    детектив: { value: 'детектив', label: 'Mystery' },
  };
  // Жанры для мультфильмов (упрощенный список)
  const optionsGenreCartoons: GenreOptions = {
    приключения: { value: 'приключения', label: 'Adventure' },
    анимация: { value: 'анимация', label: 'Animation' },
    комедия: { value: 'комедия', label: 'Comedy' },
    семейный: { value: 'семейный', label: 'Family' },
    фэнтези: { value: 'фэнтези', label: 'Fantasy' },
    фантастика: { value: 'фантастика', label: 'Sci-Fi' },
    ужасы: { value: 'ужасы', label: 'Horror' },
    мюзикл: { value: 'мюзикл', label: 'Musical' },
  };
  // Выбираем набор жанров в зависимости от типа контента
  const option =
    type === 'tv-series' || type === 'movie'
      ? optionsGenre
      : optionsGenreCartoons;

  const optionsG = Object.values(option);
  const urlGenre = genreString ? [option[genreString]] : [];

  /**
 * Эффект для установки жанра из URL параметров при монтировании
 * @effect
 */
  useEffect(() => {
    if (urlGenre.length > 0) {
      const genreValue = urlGenre[0].value;
      dispatch(setGenre([genreValue]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchParams]);

  /**
 * Обработчик выбора жанров в мультиселекте
 * @function handleSelectGenre
 * @param {MultiValue<OptionSelectGenre>} selectedOptions - Выбранные варианты жанров
 * @description Устанавливает выбранные жанры в Redux store
 */
  const handleSelectGenre = (
    selectedOptions: MultiValue<OptionSelectGenre>
  ): void => {
    const selectedGenres = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    dispatch(setGenre(selectedGenres));
  };

  // Получаем текущие жанры из Redux store и преобразуем в формат для Select
  const { genre: reduxGenreString = [] } = useSelector(selectFilter);
  const reduxGenre = reduxGenreString
    .map((genre) => option[genre])
    .filter(Boolean);

  return { optionsG, handleSelectGenre, reduxGenre };
};
