import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { selectFilter } from '../filter/filter-selector';
import { selectNavigateInfo, selectNavigateList } from './navigate-selector';
import { loadNavigate } from './navigate-slice';
import { useAppDispatch } from '../../store';

/**
 * Хук для управления пагинацией фильмов
 * @param {string} type - Тип контента (например, 'movie' или 'series')
 * @returns {Object} Объект с данными пагинации и методами управления
 * @property {number} page - Текущая страница
 * @property {MovieId[]} movies - Список загруженных фильмов
 * @property {Status} status - Статус загрузки ('idle' | 'loading' | 'received' | 'rejected')
 * @property {string | null} error - Сообщение об ошибке или null
 * @property {boolean} hasMore - Флаг наличия дополнительных страниц
 * @property {Function} handleLoadMore - Функция для загрузки следующей страницы
 */
export const usePagination = (type: string) => {
  const dispatch = useAppDispatch();

  // Получаем параметры фильтрации из Redux store
  const { genre, country, year, rating } = useSelector(selectFilter);

  const { status, error } = useSelector(selectNavigateInfo);
  const movies = useSelector(selectNavigateList);

  // Состояния текущей страницы (page) и наличия дополнительных страниц (hasMore)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /**
* Эффект для сброса пагинации при изменении параметров фильтрации
* Загружает первую страницу при изменении фильтров
*/
  useEffect(() => {
    setPage(1);
    dispatch(loadNavigate({ type, genre, country, year, rating, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, genre, country, year, rating]);

  /**
   * Эффект для определения наличия дополнительных страниц
   * Проверяет, делится ли количество фильмов на 10 без остатка
   * (предполагая, что сервер возвращает по 10 фильмов на страницу)
   */
  useEffect(() => {
    setHasMore(movies.length % 10 === 0);
  }, [movies]);

  /**
 * Функция для загрузки следующей страницы
 * @function handleLoadMore
 * @returns {void}
 */
  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(
      loadNavigate({ type, genre, country, year, rating, page: nextPage })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type, genre, country, year, rating]);

  return { page, movies, status, error, hasMore, handleLoadMore };
};
