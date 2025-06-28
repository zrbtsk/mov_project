import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';

import { removeFavourite, setFavourite } from '../favourite/favourite-slice';
import { selectFavourite } from '../favourite/favourite-selector';

/**
 * Хук для работы с избранными фильмами
 * @returns {Object} Объект с методами и данными для работы с избранным
 * @property {Function} handleFavourite - Добавляет фильм в избранное
 * @property {Function} handleRemoveFavourite - Удаляет фильм из избранного
 * @property {string[]} favourite - Текущий список ID избранных фильмов
 * 
 * @example
 * // Использование в компоненте
 * const { handleFavourite, handleRemoveFavourite, favourite } = useFavourite();
 */
export const useFavourite = () => {
  const dispatch = useAppDispatch();
  const favourite = useSelector(selectFavourite);

  /**
 * Добавляет фильм в избранное, если его там еще нет
 * @function handleFavourite
 * @param {string} id - ID фильма для добавления
 */
  const handleFavourite = (id: string) => {
    if (!favourite.includes(id)) {
      dispatch(setFavourite(id));
    }
  };

  /**
  * Удаляет фильм из избранного
  * @function handleRemoveFavourite
  * @param {string} id - ID фильма для удаления
  */
  const handleRemoveFavourite = (id: string) => {
    dispatch(removeFavourite(id));
  };

  return { handleFavourite, handleRemoveFavourite, favourite };
};
