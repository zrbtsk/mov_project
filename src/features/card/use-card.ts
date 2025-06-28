import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { loadMovieById } from './card-slice';
import { selectCurrentMovieId, selectCurrentMovieInfo } from './card-selector';
import { RootState, useAppDispatch } from '../../store';
import { selectTheme } from '../theme/theme-selector';

/**
 * Хук для работы с данными карточки фильма
 * @param {string} movId - ID фильма (imdbID)
 * @returns {Object} Объект с данными карточки фильма и состоянием загрузки
 * @property {Movie|undefined} mov - Данные фильма (undefined если не загружены)
 * @property {Status} status - Статус загрузки данных
 * @property {string|null} error - Сообщение об ошибке (если есть)
 * @property {string} theme - Текущая тема приложения
 */
export const useCard = (movId: string) => {
  const dispatch = useAppDispatch();

  const mov = useSelector((state: RootState) =>
    selectCurrentMovieId(state, movId)
  );
  const { status, error } = useSelector(selectCurrentMovieInfo);
  const theme = useSelector(selectTheme);

  /**
  * Эффект для загрузки данных фильма при монтировании
  * @effect
  * @description Загружает данные фильма если:
  * - передан корректный movId
  * - данные по этому фильму еще не загружены
  */
  useEffect(() => {
    if (movId && !mov) {
      const id = movId;
      dispatch(loadMovieById(id));
    }
  }, [dispatch, movId, mov]);

  return {
    mov,
    status,
    error,
    theme,
  };
};
