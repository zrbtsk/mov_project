import { RootState } from '../../store';

/**
 * Селектор для получения списка избранных фильмов
 * @function selectFavourite
 * @param {RootState} state - Корневое состояние Redux
 * @returns {string[]} Возвращает массив ID избранных фильмов
 * @example
 * // Использование в компоненте с useSelector
 * const favourite = useSelector(selectFavourite);
 */
export const selectFavourite = (state: RootState) => state.favourite;