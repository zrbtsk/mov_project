import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

import {
  selectMoviesInfo,
  selectMoviesList,
  selectMoviesPages,
} from './movies-selector';
import { loadMoviesBySearch } from './movies-slice';
import { useAppDispatch } from '../../store';

/**
 * Пропсы для хука useMovies
 * @interface useMoviesProps
 * @property {string} search - Текущий поисковый запрос
 * @property {number} page - Текущая страница пагинации
 * @property {Dispatch<SetStateAction<number>>} setPage - Функция для обновления номера страницы
 */
interface useMoviesProps {
  search: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

/**
 * Хук для управления загрузкой и пагинацией фильмов по поиску
 * @param {useMoviesProps} params - Параметры хука
 * @returns {Object} Объект с данными и методами управления
 * @property {string|null} error - Сообщение об ошибке или null
 * @property {Status} status - Статус загрузки ('idle' | 'loading' | 'received' | 'rejected')
 * @property {boolean} hasMore - Флаг наличия дополнительных страниц
 * @property {Function} handleLoadMoreMovie - Функция для загрузки следующей страницы
 * @property {MovieOnSearch[]} list - Список загруженных фильмов
 */
export const useMovies = ({ search, page, setPage }: useMoviesProps) => {
  const dispatch = useAppDispatch();

  const { error, status } = useSelector(selectMoviesInfo);
  const list = useSelector(selectMoviesList);
  const pages = useSelector(selectMoviesPages);

  const [hasMore, setHasMore] = useState(true);

  /**
  * Эффект для проверки наличия дополнительных страниц
  * @effect
  * @listens list, pages
  */
  useEffect(() => {
    if (pages) {
      // Проверяем есть ли еще страницы и не пустой ли список
      setHasMore(list.length > 0 && page < pages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  /**
  * Функция для загрузки следующей страницы результатов
  * @function handleLoadMoreMovie
  * @returns {void}
  */
  const handleLoadMoreMovie = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(loadMoviesBySearch({ search, page: nextPage }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return { error, status, hasMore, handleLoadMoreMovie, list };
};
